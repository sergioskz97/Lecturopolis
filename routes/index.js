const express = require('express');
const passport = require('passport')
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/events');
const { isAuthenticated } = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/eventos', async (req, res) => {
    const events = await Event.find();
    res.render('events', { events });
});

router.get('/registrarse', (req, res) => {
    res.render('signup');
});

router.post('/registrarse', async (req, res) => {
    let errors = [];
    const { username, name, surname, email, password, cpassword } = req.body;

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

    const userName = await User.findOne({username: username});

    if(userName){
        console.log("This username is on use");
        errors.push({text: 'This username is on use'});
    }

    if(errors.length == 0){
        const newUser = new User({username, name, surname, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect('/login');
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

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.post('/admin', async (req, res) =>{
    let errors = [];
    const {event, type, date} = req.body;

    if(!event){
        console.log("Please insert event name")
        errors.push({text: 'Please insert event name'})
    }

    if(!type){
        console.log("Please insert event type")
        errors.push({text: 'Please insert event type'})
    }

    if(!date){
        console.log("Please insert event date")
        errors.push({text: 'Please insert event date'})
    }

    if(errors.length == 0){
        const newEvent = new Event({event, type, date});
        await newEvent.save();
        res.redirect('/');
    }

    else{
        res.render('admin', {event, type, date});
    }
});

router.post('/eventos/borrar/:id', isAuthenticated, async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/eventos');
  });

module.exports = router;