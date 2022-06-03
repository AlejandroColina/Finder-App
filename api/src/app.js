const express = require('express');
const server = express();
server.use(express.json());
const users = require('./routes/users');
const post_persona = require('./routes/post_persona');
const mensaje = require('./routes/mensaje');
const del = require('./routes/delete');
const cors = require('cors');
server.use(cors());

server.use('/users', users);
server.use('/persona', post_persona);
server.use('/mensaje', mensaje);
server.use('/delete', del);

module.exports = server;