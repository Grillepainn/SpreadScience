const express = require('express');
const router = express.Router();
const Blogpost = require('../models/blogpost');
const mongoose = require('mongoose');

router.get('/ping', (req, res) => {
    res.status(200).json({ msg : 'pong', date: new Date()});
});

router.get('/blog-posts', (req, res) => {
    console.log('req.user', req.user);
    Blogpost.find()
    .sort({ 'createdOn': -1 })
    .exec()
    .then(blogPosts => res.status(200).json(blogPosts))
    .catch(err => res.status(404).json({
        message: 'blog post not found',
        error: err
    }));
});

router.post('/blog-posts', (req, res) => {
    console.log('req.body', req.body);
    const blogPost = new Blogpost(req.body);
    blogPost.save((err, blogPost) => {
        if (err) {
            return res.status(500).json(err);
        } 
        res.status(200).json(blogPost);
    });
});

router.get('/blog-posts/:id', (req, res) => {
    const id =  req.params.id;
    Blogpost.findById(id)
    .then(blogPost => res.status(200).json(blogPost))
    .catch(err => res.status(500).json({
        message: `blogpost with id : ${id} its not found`,
        error: err
    }));
});

router.delete('/blog-posts/:id', (req, res) => {
    const id = req.params.id;
    Blogpost.findByIdAndDelete(id, (err, blogPost) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(202).json({msg: `BlogPost with id : ${blogPost._id} deleted`});
    });
});

router.delete('/blog-posts', (req, res) => {
    const ids = req.query.ids;
    console.log('query ids', ids);
    const allIds = ids.split(',').map(id => {
        if(id.match(/^[0-9a-zA-z]{24}$/)) {
            return mongoose.Types.ObjectId((id));
        } else {
            console.log('id is not valid', id)
        }
    });
    const condition = {_id: {$in: allIds}};
    Blogpost.deleteMany(condition, (err, result) => {
        if(err) {
            return res.status(500).json(err);
        }
        res.status(202).json(result);
    });
});

router.put('/blog-posts/:id', (req, res) => {
    const id = req.params.id;
    const conditions = {_id : id};
    const blogPost = { ...req.body };
    const update = {$set: blogPost };
    const options = {
        upsert: true,
        new: true
    };
    Blogpost.findOneAndUpdate(conditions, update, options, (err, response) => {
        if(err) return res.status(500).json({msg: 'update failed', error: err})
        res.status(200).json({ msg: `Document with id : ${id} updated`, response: response});
    });
});

router.get('/blog-posts/cat/:categorie', (req, res) => {
    const cat = req.param('categorie');
    Blogpost.find({categorie: cat}, (err, response) => {
        if(err) return res.status(500).json({ msg: 'categorie introuvable', error: err})
        res.status(200).json(response);
    })
})

module.exports = router;