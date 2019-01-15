// To use router, must bring in express first.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Profile Model
const Profile = require('../../models/Profile');
// User Model
const User = require('../../models/User');

// res.json outputs json
// Route        GET api/profile/test
// Descripton   Test profile route
// Access       Public
// router.get('/test', (req, res) => res.json({message: 'Profiles work yay!'}));


// Route        GET api/profile
// Descripton   Access current user profile
// Access       Private
// Not passing in ID, using the token that has the payload with user's information that was generated. Must be logged in to get token, makes this more secure.
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Using profile model to find the user
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        return res.status(404).json({user: 'Profile not found!'})
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
