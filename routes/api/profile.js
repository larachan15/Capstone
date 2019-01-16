// To use router, must bring in express first.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Validation
const validateProfileInput = require('../../validation/profile');

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

// Route        POST api/profile
// Descripton   Creating or updating a user profile
// Access       Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Validation check
  const { errors, isValid } = validateProfileInput(req.body);
  if(!isValid) {
    // Returns errors with a 400 status
    return res.status(400).json(errors);
  }

  // Data from forms
  const profileData = {};
  profileData.user = req.user.id;
  if(req.body.userProfile) {
    profileData.userProfile = req.body.userProfile;
  }
  if(req.body.bio) {
    profileData.bio = req.body.bio;
  }
  if(req.body.pronouns) {
    profileData.pronouns = req.body.pronouns;
  }
  if(req.body.hometown) {
    profileData.hometown = req.body.hometown;
  }
  if(req.body.interest) {
    profileData.interests = req.body.interests;
  }

  // Find a logged in user
  Profile.findOne({ user: req.user.id})
    .then(profile => {
      if(profile) {
        // updates profile if it exists. Use findOneAndUpdate method, which gives back a promise
        // When using the $set operator, only the specified fields are updated
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        )
        // gives back a promise
        .then(profile => res.json(profile));
      } else {
        // check to see if the userProfile exists
        Profile.findOne({ userProfile: profileData.userProfile }).then(profile => {
          if(profile) {
            // if profile already exists, send back error
            errors.userProfile = 'This profile already exists';
            res.status(400).json(errors);
          }
          // creates new profile if it doesn't exist
          new Profile(profileData).save()
            .then(profile => res.json(profile));
        });
      }
    })
});

module.exports = router;
