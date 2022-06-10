const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona } = require('../db');
router.use(cors());
router.use(express.json());

router.put('/add/:email', async (req, res) => {
    const { email } = req.params;

    let persona = await Persona.findOne({ where: { email: email } })
    if (persona === null) return res.status(404).send('No existe el usuario.');

    let noti = persona.dataValues.notificaciones
    noti.push(req.body)

    await Persona.update({ notificaciones: noti }, { where: { email: email } });

    let p = await Persona.findOne({ where: { email: email } })

    return res.json(p)
});

router.put('/delete/:email/:id', async (req, res) => {
    const { email, id } = req.params

    let persona = await Persona.findOne({ where: { email: email } })
    if (persona === null) return res.status(404).send('No existe el usuario.');

    let noti = persona.dataValues.notificaciones

    await Persona.update({ notificaciones: noti.filter(e => e.publicacionId !== parseInt(id)) }, { where: { email: email } });

    let p = await Persona.findOne({ where: { email: email } })

    return res.json(p)
});

module.exports = router;