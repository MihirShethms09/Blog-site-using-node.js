const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connecting mongodb database
const dbURL = "mongodb+srv://mihirsheth:Mihirshethms0906@cluster0.eof6h.mongodb.net/learn?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( result => {app.listen(3000);console.log("connected to db");})
    .catch( err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

app.use(express.static('public')); //static is an inbuilt express middleware that allows css files, images, etc to be displayed in the browser.
//here the argument of the static function indicates the name of the folder where in we keep our static files likes css,images,etc.
app.use(express.urlencoded( {extended: true} ));//url encoded is a middleware that accepts the entries of the form when we click submit
app.use(morgan('dev'));


app.get('/', (req, res) => {
    // const blogs = [
    //     {title: "mihir", "snippet": "mihir is a 21 years old smart and handsome guy"},
    //     {title: "shreya", snippet: "shreya is a 22 years old intelligent and beautiful girl"}
    // ]
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'about'});
});

app.use('/blogs', blogRoutes);

app.get('/about-me', (req, res) => {
    res.render('about', {title: 'about'});
});

app.use((req, res) => { // this function is to be kept last bcoz if none of above function executes then this function will execute
    res.status(400).render('404', { title: 'error 404'});
});


//experimental code to check the connection with mongodb
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'node.js 2',
//         snippet: 'node.js 2 is an amazing language',
//         body: 'i think its going to be my fav language for web development'
//     });

//     blog.save()
//     .then( result => res.send(result))
//     .catch( err => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find() //find function returns the array of all the blogs present in collection of mongodb
//     .then( result => res.send(result))
//     .catch( err => console.log(err));
// })
