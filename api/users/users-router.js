const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const User = require('./users-model')
const Post = require('../posts/posts-model')



router.get('/', logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
  .then(u => {
    res.status(200).json(u)
  })
  .catch(err => {
    next(err)
  })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
  .then(newUser => {
    res.status(201).json(newUser);
  })
  .catch(error => {
    next(error);
  })
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  User.update(req.params.id, req.body)
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(deletedUser => {
    res.json(deletedUser);
  })
  .catch(err => {
    next(err);
  });
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(p => {
    res.status(200).json(p);
  })
  .catch(err => {
    next(err);
  });
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id };

  Post.insert(postInfo)
  .then(newPost => {
    res.status(210).json(newPost);
  })
  .catch(error => {
    next(error);
  });
});

// do not forget to export the router

module.exports = router;

