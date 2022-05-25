const express = require('express');
const router = express.Router();
const { Persona } = require('../db');
router.use(express.json());


//localhost:3001/person
router.post('/', async (req, res, next) => {
    try {
        const { nombres, apellidos, documento, telefono, email, edad, domicilio, fotos, profesion } = req.body;
        console.log(req.body)

        let p = await Persona.findAll();
        console.log('P1', p);

        let h = await Persona.create({
            nombres, apellidos, documento, telefono, email, edad
        });

        console.log('H', h)

        let p2 = await Persona.findAll();
        console.log('P2', p2);

        await h.setProfesions(profesion)

        res.send('ok')

    } catch (error) {
        next(error)
    }

});

module.exports = router;