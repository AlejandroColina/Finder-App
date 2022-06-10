const transporter = require('./transporter');
const { Persona } = require('../db')
const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/baneo/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta acaba de ser restringida.',
            html: `<p>
        <b>${persona?.dataValues.nombres}</b>. Por políticas Finder, tu perfil acaba de ser restringido.
        Para más información contacta a la administración.
        </p>`
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

router.get('/desbaneo/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta acaba de liberarse.',
            html: `<p>
        <b>${persona?.dataValues.nombres}</b>. En este momento se libera nuevamente tu cuenta Finder. 
        Sácale el máximo provecho sin ir más allá de las políticas establecidas en nuestra plataforma.
        </p>`
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

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        let persona = await Persona.findOne({ where: { id: id } });
        if (persona === null) return res.status(404).send('Usuario no se creo correctamente.');

        let message = {
            from: 'Finder Community <finder.app.henry@hotmail.com>',
            to: persona?.dataValues.email,
            subject: 'Tu cuenta acaba de eliminarse.',
            html: `<p>
            <b>${persona?.dataValues.nombres}</b>. Por políticas Finder, tu perfil acaba de ser eliminado.
            Para más información contacta a la administración.
            </p>`
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
            html: `<p>
            <b>${persona?.dataValues.nombres}</b>Acabas de crear una publicación.
            Finder te desea los mejores resultados.
            </p>`
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