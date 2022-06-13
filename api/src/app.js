process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
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
const bodyParser = require('body-parser');
const cors = require('cors');
server.use(cors());

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;