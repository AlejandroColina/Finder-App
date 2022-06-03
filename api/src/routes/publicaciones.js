const express = require("express");
const router = express.Router();
const { Persona, Profesion, Direccion, Publicacion } = require("../db");
router.use(express.json());


router.get("/", async (req, res, next) => {
  try {

    let { profesion, nombres, promedio, genero, edad, ciudad, descripcion } =
      req.query;

    let tablaPublicacion = await Publicacion.findAll();
    let obj = [];

    let personas = await Persona.findAll({
      include: [Profesion]
    });

    tablaPublicacion?.map(async (posts) => {
      let post = posts?.dataValues
      let idPersona = post?.PersonaId;

      let persona = personas.filter(e => e.dataValues.id === idPersona);
      let user = persona[0]?.dataValues;
      let profesion = persona[0]?.dataValues?.Profesions[0]?.dataValues;

      obj.push({
        idPublicacion: post.id,
        nombres: user.nombres,
        apellido: user.apellidos,
        promedio: user.promedio,
        imagen: user.imagen,
        descripcion: post.descripcion,
        Profesions: profesion.nombre,
        logoProfesion: profesion.logo,
        genero: user.genero,
        edad: user.edad,
        ciudad: user.ciudad
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

    if (edad) {
      obj = obj.filter((persona) => persona.edad == edad);
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
