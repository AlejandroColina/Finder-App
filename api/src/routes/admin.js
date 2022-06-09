const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona } = require('../db')
router.use(cors());
router.use(express.json())

router.patch('/:id/:estado', async (req, res, next) => {
    const { id, estado } = req.params;

    await Persona.update(
        { baneado: estado }, { where: { id: id } });

    let persona = await Persona.findOne({ where: { id: id } });

    return res.json(persona)
});

router.get('/validar/:email', async (req, res, next) => {
    try {
        const { email } = req.params;
        let persona = await Persona.findOne({ where: { email: email } });
        if (persona === null) return res.status(404).send('No existe.');

        persona = persona.baneado
        return res.json(persona)
        
    } catch (error) {
        next(error)
    }
});

module.exports = router;