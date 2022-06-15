const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona, Publicacion, Direccion, Profesion } = require('../db');
router.use(express.json());
router.use(cors());


router.get('/', async (req, res, next) => {
    try {
        let { email, idPublicacion } = req.query;
        let persona = await Persona.findOne({ where: { email: email } });
        if (persona === null) return res.status(404).send('No existe este usuario en BD.');

        let trabajos = persona.dataValues.trabajosPagos;
        if (trabajos.includes(parseInt(idPublicacion))) {
            return res.json(true)
        } else {
            return res.json(false)
        }

    } catch (error) {
        next(error)
    }

});

router.delete('/delete/:idPersona/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });
        if (persona === null) return res.status(404).send('No existe este usuario en BD.');

        if (persona.dataValues.trabajosPagos.length > 0) {
            await Persona.update({
                trabajosPagos: persona.dataValues.trabajosPagos.filter(e => e != idPublicacion)
            }, { where: { id: idPersona } });
        }
        let personas = await Persona.findOne({ where: { id: idPersona } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

router.patch('/add/:email/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, email } = req.params;

        let persona = await Persona.findOne({ where: { email: email } });
        if (persona === null) return res.status(404).send('No existe este usuario en BD.');

        let pagos = persona.dataValues.trabajosPagos;

        if (pagos.includes(parseInt(idPublicacion))) return res.json(persona)

        pagos.push(parseInt(idPublicacion));

        await Persona.update({
            trabajosPagos: pagos
        }, { where: { email: email } });
        
        let personas = await Persona.findOne({ where: { email: email } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

module.exports = router;