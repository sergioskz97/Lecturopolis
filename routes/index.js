const express = require('express');
const passport = require('passport')
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/eventos', (req, res) => {
    res.render('events');
});

router.get('/registrarse', (req, res) => {
    res.render('signup');
});

router.post('/registrarse', async (req, res) => {
    let errors = [];
    const { name, surname, email, password, cpassword } = req.body;

    if(password != cpassword) {
        console.log("Passwords do not match");
        errors.push({text: 'Passwords do not match.'});
    }

    if(password.length < 4){
        console.log("Pasword length is too short");
        errors.push({text: 'Pasword length is too short'});
    }

    const emailUser = await User.findOne({email: email});

    if(emailUser) {
        console.log("This email is on use");
        errors.push({text: 'This email is on use'});
    }

    if(errors.length == 0){
        const newUser = new User({name, surname, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
    }

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;