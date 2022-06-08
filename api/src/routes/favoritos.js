const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona, Publicacion, Direccion, Profesion } = require('../db');
router.use(express.json());
router.use(cors());

router.get('/:email', async (req, res, next) => {
    try {
        const { email } = req.params;

        let misFav = await Persona.findOne({ where: { email: email } });

        if (misFav !== null) {
            misFav = misFav.dataValues.favoritos;
            let TusFavoritos = [];

            for (let f, j, i = 0; i < misFav.length; i++) {
                j = await Publicacion.findOne({
                    where: { id: misFav[i] },
                    include: [Profesion, Direccion]
                });
                f = await Persona.findAll(
                    {
                        include: [

                            { model: Publicacion, include: [Direccion, Profesion] }
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
                });
                console.log()
            };

            return res.json(TusFavoritos);
        }
        return res.json('No existe un usuario con este email.')

    } catch (error) {
        next(error)
    }

});

router.patch('/add/:email/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, email } = req.params;

        let persona = await Persona.findOne({ where: { email: email } });

        let favs = persona.dataValues.favoritos
        favs.push(parseInt(idPublicacion));

        await Persona.update({
            favoritos: favs
        }, { where: { email: email } });
        let personas = await Persona.findOne({ where: { email: email } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

router.delete('/delete/:email/:idPublicacion', async (req, res, next) => {
    try {
        const { idPublicacion, email } = req.params;

        let persona = await Persona.findOne({ where: { email: email } });
        if (persona.dataValues.favoritos !== null) {
            await Persona.update({
                favoritos: persona.dataValues.favoritos.filter(e => e !== parseInt(idPublicacion))
            }, { where: { email: email } });
        }
        let personas = await Persona.findOne({ where: { email: email } });

        res.json(personas)
    } catch (error) {
        next(error);
    }
});

module.exports = router;