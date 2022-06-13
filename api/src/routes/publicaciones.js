const express = require("express");
const router = express.Router();
const { Persona, Profesion, Direccion, Publicacion } = require("../db");
const cors = require('cors');
router.use(cors());
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {

    let { profesion, nombres, promedio, genero, edad, ciudad, descripcion,precio,titulo } =
      req.query;

    let tablaPublicacion = await Publicacion.findAll(
      { include: [Profesion, Direccion] }
    );
    if (!tablaPublicacion.length) return res.status(404).send('No hay datos.');

    let obj = [];

    let personas = await Persona.findAll();

    tablaPublicacion?.map(async (posts) => {
      let post = posts?.dataValues
      let idPersona = post?.PersonaId;

      let persona = personas.filter(e => e.dataValues.id === idPersona);
      let user = persona[0]?.dataValues;
      obj.push({
        idPublicacion: post?.id,
        idPersona: user?.id,
        nombres: user?.nombres,
        apellido: user?.apellidos,
        promedio: user?.promedio,
        imagen: user?.imagen,
        titulo: post?.titulo,
        precio: post?.precio,
        descripcion: post?.descripcion,
        Profesions: post?.Profesion.dataValues.nombre,
        logoProfesion: post?.Profesion.dataValues.logo,
        genero: user?.genero,
        edad: user?.edad,
        ciudad: post?.Direccion?.dataValues?.ciudad
      })
    });

    if (descripcion) {
      obj = obj.filter((persona) => {
        return persona.descripcion.toLowerCase().includes(
          descripcion.toLowerCase()
        );
      });
    }

    if (profesion) {
      obj = obj.filter((persona) => {
        return persona.Profesions.toLowerCase().includes(
          profesion.toLowerCase()
        );
      });
    }

    if (nombres) {
      obj = obj.filter((persona) => {
        return persona.nombres.toLowerCase().includes(nombres.toLowerCase());
      });
    }

    if (genero) {
      obj = obj.filter((persona) => {
        return persona.genero == genero;
      });
    }

    if (edad === 30 || edad === 40) {
      obj = obj.filter((persona) => persona.edad <= edad);
    }
    if(edad == "mayor"){
       obj = obj.filter((persona) => persona.edad >= 40);
    }

    if (promedio) {
      obj = obj.filter(
        (persona) => persona.promedio >= promedio
      );
    }

    if (ciudad) {
      obj = obj.filter(
        (persona) => persona.ciudad.toLowerCase() == ciudad.toLowerCase()
      );
    }

    res.json(obj);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
