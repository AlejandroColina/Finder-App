const express = require('express');
const router = express.Router();
const { Persona, Actividades, Profesion } = require('../db');
router.use(express.json());


//localhost:3001/person
router.post('/', async (req, res, next) => {
    try {
        const { nombres, apellidos, documento, telefono, email, edad, domicilio, fotos, profesion, actividad } = req.body;

        let persona = await Persona.create({
            nombres, apellidos, documento, telefono, email, edad
        });

        await persona.setProfesions(profesion)

        let prueba = await Persona.findAll({
            include: [{
                model: Profesion,
                attributes: ['nombre']
            }]
        });

        res.send('ok')

    } catch (error) {
        next(error)
    }

});

module.exports = router;