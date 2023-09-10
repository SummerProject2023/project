const express = require('express');
const router =  express.Router();
const path = require('path');

const {login,signup} = require('../apiHandler/authHandler.js');

///serve the login page
router.route("/login").
get((req,res) => {
    res.sendFile(path.join(__dirname,'../../BaghChal-WebApp/views/auth/login.html'));
});
router.route("").
get((req,res) => {
    res.sendFile(path.join(__dirname,'../../BaghChal-WebApp/views/auth/login.html'));
});

router.route("/api/auth/login").
post((req,res)=> {
    // authenticate the user.
    login(req,res);
});

router.route('/signup').get((req,res)=> {
    res.sendFile(path.join(__dirname,'../../BaghChal-WebApp/views/auth/signup.html'));
});
router.route("/api/auth/signup")
.post((req,res)=>{
    //sign up the user
    signup(req,res);
});

module.exports = router;