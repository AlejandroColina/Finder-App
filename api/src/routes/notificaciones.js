const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona } = require('../db');
router.use(cors());
router.use(express.json());

router.get('/:email', async (req, res, next) => {
    try {
        const { email } = req.params

        let persona = await Persona.findOne({ where: { email: email } })
        if (persona === null) return res.status(404).send('No existe el usuario.');

        let notificaciones = persona?.dataValues.notificaciones;

        return res.json(notificaciones)
    } catch (error) {
        next(error)
    }
});

router.put('/add/:email', async (req, res, next) => {
    try {
        const { email } = req.params

        let persona = await Persona.findOne({ where: { email: email } })
        if (persona === null) return res.status(404).send('No existe el usuario.');

        let noti = persona.dataValues.notificaciones
        noti.push(req.body)

        await Persona.update({ notificaciones: noti }, { where: { email: email } });

        let p = await Persona.findOne({ where: { email: email } })

        return res.json(p)
    } catch (error) {
        next(error)
    }
});

router.put('/delete/:email/:id', async (req, res, next) => {
    try {
        let { email, id } = req.params
        id = parseInt(id)

        let persona = await Persona.findOne({ where: { email: email } })
        if (persona === null) return res.status(404).send('No existe el usuario.');

        let noti = persona.dataValues.notificaciones
        noti = noti.filter(e => e.PublicacionId !== id)

        await Persona.update({
            notificaciones: noti.filter(e => e.PublicacionId !== id)
        }, { where: { email: email } });

        let p = await Persona.findOne({ where: { email: email } })

        return res.json(p)
    } catch (error) {
        next(error);
    }
});

module.exports = router;