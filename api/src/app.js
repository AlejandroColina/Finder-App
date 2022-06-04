const express = require('express');
const server = express();
server.use(express.json());
const users = require('./routes/users');
const publicaciones = require('./routes/publicaciones');
const mensaje = require('./routes/mensaje');
const del = require('./routes/delete');
const comentario = require('./routes/comentario');
const cors = require('cors');
server.use(cors());

server.use('/users', users);
server.use('/publicaciones', publicaciones);
server.use('/mensaje', mensaje);
server.use('/delete', del);
server.use('/comentario',comentario);

module.exports = server;