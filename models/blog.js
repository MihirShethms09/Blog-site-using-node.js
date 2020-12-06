const mongoose = require("mongoose");
const Schema = mongoose.Schema;

blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true }); //timestamps features adds the property of created at and updated at.
 
Blog = mongoose.model('Blog', blogSchema); //here the first argument to model function should be the singular of the collection name created in mongodb

module.exports = Blog;