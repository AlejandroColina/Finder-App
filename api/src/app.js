const express = require('express');
const server = express();
server.use(express.json());
const users = require('./routes/users');
const publicaciones = require('./routes/publicaciones');
const trabajos = require('./routes/trabajosPagos');
const mensaje = require('./routes/mensaje');
const del = require('./routes/delete');
const favoritos = require('./routes/favoritos');
const comentario = require('./routes/comentario');
const pregunta = require('./routes/pregunta');
const baneo = require('./routes/admin');
const notificaciones = require('./routes/notificaciones');
const emailToConfirm = require('./routes/emailToConfirm');
const cors = require('cors');
server.use(cors());

server.use('/users', users);
server.use('/publicaciones', publicaciones);
server.use('/mensaje', mensaje);
server.use('/delete', del);
server.use('/comentario', comentario);
server.use('/pregunta', pregunta);
server.use('/favoritos', favoritos);
server.use('/trabajos', trabajos);
server.use('/suspender', baneo);
server.use('/notificaciones', notificaciones);
server.use('/email', emailToConfirm);
server.get('*', (req, res) => {
    res.send('<h1>Página NO encontrada en FINDER. 😡🥶</h1>')
});

module.exports = server;