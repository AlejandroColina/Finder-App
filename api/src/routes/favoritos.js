const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona, Publicacion, Direccion, Profesion } = require('../db');
router.use(express.json());
router.use(cors());

router.get('/:idPersona', async (req, res, next) => {
    try {
        const { idPersona } = req.params;

        let misFav = await Persona.findOne({ where: { id: idPersona } });

        if (misFav !== null) {
            misFav = misFav.dataValues.favoritos;
            let TusFavoritos = [];

            for (let f, j, i = 0; i < misFav.length; i++) {
                j = await Publicacion.findOne({
                    where: { id: misFav[i] },
                    include: [Profesion]
                });
                f = await Persona.findAll(
                    {
                        include: [
                            Direccion,
                            { model: Publicacion, include: [Profesion] }
                        ], where: { id: j.PersonaId }
                    }
                );
                TusFavoritos.push({
                    idPublicacion: misFav[i],
                    idPersona: f[0].dataValues.id,
                    nombres: f[0].dataValues.nombres,
                    apellido: f[0].dataValues.apellidos,
                    promedio: f[0].dataValues.promedio,
                    imagen: f[0].dataValues.imagen,
                    descripcion: j.descripcion,
                    precio: j.precio,
                    titulo: j.titulo,
                    Profesions: j.dataValues.Profesion.dataValues.nombre,
                    logoProfesion: j.dataValues.Profesion.dataValues.logo,
                    genero: f[0].dataValues.genero,
                    edad: f[0].dataValues.edad,
                    ciudad: f[0].dataValues.Direccions[0].dataValues.ciudad
                });
                console.log()
            };

            return res.json(TusFavoritos);
        }
        return res.json('No existe un usuario con este id.')

    } catch (error) {
        next(error)
    }

});

router.patch('/add/:idPersona/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });

        let favs = persona.dataValues.favoritos
        console.log(favs)
        favs.push(parseInt(idPublicacion));

        await Persona.update({
            favoritos: favs
        }, { where: { id: idPersona } });
        let personas = await Persona.findOne({ where: { id: idPersona } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:idPersona/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, idPersona } = req.params;

        let persona = await Persona.findOne({ where: { id: idPersona } });
        if (persona.dataValues.favoritos !== null) {
            await Persona.update({
                favoritos: persona.dataValues.favoritos.filter(e => e != idPublicacion)
            }, { where: { id: idPersona } });
        }
        let personas = await Persona.findOne({ where: { id: idPersona } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

module.exports = router;