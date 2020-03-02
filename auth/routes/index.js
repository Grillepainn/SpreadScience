const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post('/register', (req, res) => {
    console.log('user form req.body >>> ', req.body);
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            return res.status(500).json(err);
        }
        req.login(req.body, (err) => {
            if(err) {
                console.log('err in register | req.login()', err); 
            }
            res.status(201).json(user);
        })
    });
}); 

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));

router.get('/success', (req, res) => {
    res.status(200).json({ msg: 'logged in!', user: req.user});
});

router.get('/failure', (req, res) => {
    res.status(401).json({ msg: 'NOT LOGGED IN'});
});

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({msg : 'logged out success'});
})

module.exports = router;