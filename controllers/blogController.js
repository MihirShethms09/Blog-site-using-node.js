const Blog = require('../models/blog.js');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // -1 indicates descending order
    .then(result => {
        res.render('home', {title: 'All blogs', blogs: result});
    })
    .catch(err => console.log(err));
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', {blog: result, title: "Blog Details"});
    })
    .catch(err => res.status(404).render('404', {title: "Page not found"}));
}

const blog_create = (req, res) => {
    res.render('create', {title: 'write blog'});
}

const blog_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then( result => res.redirect('/') )
    .catch( err => console.log(err) );
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => res.json({redirect: '/'}))
    .catch(err => console.log(err));
}
module.exports = {
    blog_index,
    blog_details,
    blog_create,
    blog_post,
    blog_delete
}