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
const cors = require('cors');
server.use(cors());

server.use('/users', users);
server.use('/publicaciones', publicaciones);
server.use('/mensaje', mensaje);
server.use('/delete', del);
server.use('/comentario', comentario);
server.use('/favoritos', favoritos);
server.use('/trabajos', trabajos);
server.get('*', (req, res) => {
    res.send('<h1>Página NO encontrada en FINDER. 😡🥶</h1>')
});

module.exports = server;