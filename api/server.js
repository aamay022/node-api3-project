const express = require('express');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
const usersRouter = require('./users/users-router')

server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message
    });
  });
  

module.exports = server;
