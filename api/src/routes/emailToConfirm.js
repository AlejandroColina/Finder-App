const transporter = require('./transporter');
const { Persona } = require('../db')
const express = require('express');
const cors = require('cors');
const baneo = require('../mensajes/baneo');
const desbaneo = require('../mensajes/desbaneo');
const cuentaEliminada = require('../mensajes/cuentaEliminada');
const nuevoPost = require('../mensajes/nuevoPost');
const respuestaFinder = require('../mensajes/respuestaFinder');
const router = express.Router();
router.use(express.json());
router.use(cors());

router.patch('/baneo/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta acaba de ser restringida.',
            html: baneo()
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });

        res.send('Email enviado.');
    } catch (error) {
        next(error);
    }
});

router.patch('/desbaneo/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta acaba de liberarse.',
            html: desbaneo()
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });

        res.send('Email enviado.');
    } catch (error) {
        next(error);
    }
});

router.patch('/eliminarUser/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta finder acaba de ser eliminada.',
            html: cuentaEliminada()

        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });

        res.send('Email enviado.');
    } catch (error) {
        next(error);
    }
});

router.patch('/nuevo_post/:email', async (req, res, next) => {
    try {
        const { email } = req.params;

        let persona = await Persona.findOne({ where: { email: email } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu publicación acaba de ser creada.',
            html: nuevoPost()
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });

        res.send('Email enviado.');
    } catch (error) {
        next(error);
    }
});

router.post('/respuesta/:email', async (req, res, next) => {
    try {
        const { email } = req.params;

        let persona = await Persona.findOne({ where: { email: email } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Respuesta a tu consulta.',
            html: respuestaFinder(req.body)
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
        });

        res.send('Email enviado.');
    } catch (error) {
        next(error);
    }
});




module.exports = router;
