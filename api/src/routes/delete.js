const express = require('express');
const router = express.Router();
const cors = require('cors');
const { Persona, Publicacion } = require("../db");
router.use(express.json());
router.use(cors());

router.delete('/user/:id', async (req, res, next) => {
    const { id } = req.params;

    let consultaBD = await Persona.findByPk(id);
    if (consultaBD == null) {
        return res.status(404).send('El usuario no existe en la BD.')
    } else {
        await Persona.destroy({ where: { id: id } })
        return res.send('Usuario eliminado.');
    }
});

router.delete('/post/:id', async (req, res, next) => {
    const { id } = req.params;
    console.log(id)

    let consultaBD = await Publicacion.findByPk(id);
    if (consultaBD == null) {
        return res.status(404).send('El post no existe en la BD.')
    } else {
        await Publicacion.destroy({ where: { id: id } })
        return res.send('Post eliminado.');
    }
});


module.exports = router;