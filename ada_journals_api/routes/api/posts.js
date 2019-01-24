// To use router, must bring in express first.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require('../../models/Post');

// Profile Model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// res.json outputs json
// Route        GET api/posts/test
// Descripton   Test post route
// Access       Public
router.get('/test', (req, res) => res.json({message: 'posts work yay!'}));

// Route GET api/posts
// Description Get all posts
// Access Public
router.get('/', (req, res) => {
  Post.find()
  .sort({ date: -1 })
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({postsNotFound: 'No posts found'}));
});

// Route GET api/posts/:id
// Description Get a single post
// Access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({postNotFound: `The post you are looking for doesn't exist`}));
});

// Route        POST api/posts/test
// Descripton   Create a post
// Access       Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// Route        DELETE api/posts/:id
// Descripton   Delete a post
// Access       Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        // Check that the post belongs to user that wants to delete it.
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: 'User is not authorized'});
        }

        post.remove().then(() => res.json({ success: true }));
      })

    })
    .catch(err => res.status(404).json({postNotFound: `The post you are looking for doesn't exist`}));
});

// Route        POST api/posts/like/:id
// Descripton   Like a post
// Access       Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyLiked: `You've already liked this post!`})
        }
        // Adding user id to likes array
        post.likes.push({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
    })
    .catch(err => res.status(404).json({postNotFound: `The post you are looking for doesn't exist`}));
});

// Route        POST api/posts/unlike/:id
// Descripton   Unlike a post
// Access       Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res
              .status(400)
              .json({ notliked: 'You have not liked this post' });
          }

          // Remove index and splice out of array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
    });
  }
);

// Route        POST api/posts/comment/:id
// Descripton   Comment on a post
// Access       Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
      }

      post.comments.push(newComment);
      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postNotFound: 'No post found'}));
});

// Route        DELETE api/posts/comment/:id/:comment_id
// Descripton   Remove a comment on a post
// Access       Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      // Checking to see if comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ noExistingComment: `Comment doesn't exist` })
      }

      // Remove index and splice out of array
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postNotFound: 'No post found'}));
});

module.exports = router;
