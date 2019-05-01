const express = require('express');
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
    const { name, email, password, confirm_password } = req.body;
    if(password != confirm_password) {
        errors.push({text: 'Passwords do not match.'});
    }
    if(password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 characters.'})
    }
    if(errors.length > 0){
    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
        } else {
        // Saving a New User
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        }
    }

    console.log(req.body);
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;