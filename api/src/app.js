const express = require('express');
const server = express();
server.use(express.json());
const users = require('./routes/users');

server.use('/users', users);

module.exports = server;