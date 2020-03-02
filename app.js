const express = require('express');
const app = express();
const api = require('./api/v1/index');
const auth = require('./auth/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 8080));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// passport (authentification, inscription ...)
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Strategy = require('passport-local').Strategy;
const User = require('./auth/models/user');

app.use(cookieParser());
app.use(session({
    secret: 'my super secret', 
    resave: true,
    saveUninitialized: true,
    name: 'spreadscience-cookie'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) =>{
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (name, pwd, cb) => {
    User.findOne({ username: name }, (err, user) => {
        if (err) {
            console.log(`could not find ${name} in MongoDB`, err);
        } 
        if (user.password !== pwd) {
            console.log(`wrong password for ${name}`);
            cb(null, false);
        } else {
            console.log(`${name} found in MongoDB and authenticated`);
            cb(null, user);
        }
    })
}));

//fin de passport

app.use('/auth', auth);

app.use('/api/v1/', api);
app.use((req, res) => {
    const err = new Error('404 not found !!!!');
    err.status = 404;
    res.json({msg: '404 not fond !!!!!', err: err});
});

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/spreadscience', { useNewUrlParser: true});
connection.on('error', (err) => {
    console.error(`connect to mongodb error : ${err.message}`);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('spreadcience/dist' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'spreadscience', 'dist', 'spreadscience', 'index.html'));
    });
}

connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(app.get('port'), () => {
        console.log(`express listen on port ${app.get('port')} :)`);
    });
});

