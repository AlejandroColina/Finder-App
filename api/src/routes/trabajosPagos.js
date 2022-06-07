const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona, Publicacion, Direccion, Profesion } = require('../db');
router.use(express.json());
router.use(cors());


router.get('/:idPersona', async (req, res, next) => {
    try {
        let { idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });

        if (Object.values(persona)) {
            let trabajos = persona.dataValues.trabajosPagos;
            return res.json(trabajos);
        }
        return res.send([])
    } catch (error) {
        next(error)
    }

});

router.delete('/delete/:idPersona/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });
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

router.patch('/add/:idPersona/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });

        let pagos = persona.dataValues.trabajosPagos;
        pagos.push(parseInt(idPublicacion));

        await Persona.update({
            trabajosPagos: pagos
        }, { where: { id: idPersona } });

        let personas = await Persona.findOne({ where: { id: idPersona } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

module.exports = router;