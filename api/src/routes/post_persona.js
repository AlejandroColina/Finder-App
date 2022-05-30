const express = require("express");
const router = express.Router();
const { Persona, Direccion } = require("../db");
router.use(express.json());

router.post("/", async (req, res, next) => {
  try {
    const {
      nombres,
      apellidos,
      documento,
      telefono,
      email,
      edad,
      imagen,
      descripcion,
      direccion,
      genero,
      profesion,
    } = req.body;
    console.log(req.body);
    let consultaBD = await Persona.findAll({ where: { documento: documento } });

    if (consultaBD.length) {
      return res.send("EL USUARIO YA EXISTE EN LA BASE DE DATOS");
    } else {
      const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!validateEmail.test(email.replaceAll('"', "")))
        return res.status(404).send("ERROR CON EL CORREO ELECTRONICO");
      if (
        typeof edad !== "number" ||
        typeof telefono !== "number" ||
        typeof documento !== "number"
      )
        return res.status(404).send("ERROR CON VALORES NUMERICOS");

      if (
        nombres === undefined ||
        apellidos === undefined ||
        documento === undefined ||
        telefono === undefined ||
        email === undefined ||
        direccion === undefined ||
        descripcion === undefined
      ) {
        return res
          .status(404)
          .send("FALTAN DATOS REQUERIDOS PARA CREAR USUARIO.");
      } else {
        let persona = await Persona.create({
          nombres,
          apellidos,
          documento,
          telefono,
          email,
          edad,
          imagen,
          descripcion,
          direccion,
          genero,
          profesion,
        });

        await persona.setProfesions(profesion);
        let PersonaId = await Persona.findOne({
          where: { documento: documento },
        });

        PersonaId = PersonaId.dataValues.id;
        await Direccion.create({
          direccion,
          PersonaId,
          pais: "COL",
          ciudad: "PER",
        });
        return res.send("USUARIO CREADO CORRECTAMENTE.");
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
