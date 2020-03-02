const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: String,
    categorie: String,
    image: String,
    content: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blogpost', blogPostSchema);