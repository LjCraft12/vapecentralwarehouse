const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const config   = require('../config/database');
const User     = require('../models/user');


// Register Route
router.post('/register', (req, res, next) => {                                                                          // Registering a user in the user route
    let newUser = new User({
        name:     req.body.name,
        email:    req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,  (err, user) => {                                                                             // Saving the user
        if (err) {                                                                                                      // Testing for user creation error
            res.json({ success: false, message: 'Failed to register user' });
        } else {                                                                                                        // If no error creating the user
            res.json({ success: true, message: 'User created successfully' })
        }
    });

});

// Authenticate Route
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;                                                                                 // Retrieve username
    const password = req.body.password;                                                                                 // Retrieve user password

    User.getUserByUsername(username, (err, user) => {                                                                   // Checking for username
        if (err) throw err;                                                                                             // Test for error
        if(!user){                                                                                                      // User not found
            return res.json({ success: false, message: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;                                                                                         //Test for password error
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 259200                                                                                   // Token expires in 72hrs
                });

                res.json({                                                                                              // If username and password exist and are correct
                    success: true,
                    token:   'JWT ' + token,
                    user: {                                                                                             // Sending back custom user object
                        id:       user._id,
                        name:     user.name,
                        username: user.username,
                        email:    user.email
                    }
                });
            } else {
                return res.json({ success: false, message: 'Password is invalid' });
            }
        });
    })
});

// Profile Route
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;