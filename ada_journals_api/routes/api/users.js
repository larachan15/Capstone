// To use router, must bring in express first.
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Input Validations
const validateRegistrationInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// res.json outputs json
// Route        GET api/users/test
// Descripton   Test users route
// Access       Public
router.get('/test', (req, res) => res.json({message: 'Users work yay!'}));

// Route        POST api/users/registration
// Descripton   Register a user
// Access       Public
router.post('/registration', (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  // Checking validation, if input is empty or not the correct number of characters
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // to locate a record of a user with an email they are trying to register with
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists!'});
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        //  bcrypt hashing function builds a password security platform and always hashes every password with a salt
        // generate a salt (adding additional random data that makes each password hash unique)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// Route        POST api/users/login
// Descripton   Login user / Returning json web token token
// Access       Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Checking validation, if input is empty or not the correct number of characters
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find a user by email
  User.findOne({email})
    .then(user => {
      // Check for user
      if(!user) {
        return res.status(404).json({email: 'User email not found!'});
      }

      // Check for password
      bcrypt.compare(password, user.password)
        .then(isAMatch => {
          if(isAMatch) {
            // res.json({message: 'Success!'});
            // Matched User
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            }

            // Sign Token
            // Bearer token is a type of protocol
            // https://stackoverflow.com/questions/25838183/what-is-the-oauth-2-0-bearer-token-exactly
            jwt.sign(
              payload,
              keys.secretOrKey,
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({password: 'Incorrect password'});
          }
        });
    });
});

// Route        GET api/users/current
// Descripton   Return Current User
// Access       Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
      // For Postman tests:
      // res.json({ message: 'Successful login!'});
      // res.json(req.user);
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      })
});

module.exports = router;
