const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Persona, Profesion, Direccion, Publicacion } = require("../db");
router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    let { profesion, nombres, promedio, genero, edad, ciudad, descripcion } =
      req.query;

    let personasDB = await Persona.findAll({
      include: [Profesion, Direccion, Publicacion],
    });
    if (personasDB.length == 0)
      return res.send("LA BASE DE DATOS NO TIENE INFORMACION");

    let objPersonas = personasDB.map((person) => {
      let publicacion = person.Publicacions?.map((obj) => {
        return {
          idPublicacion: obj.id,
          descripcion: obj.descripcion,
          precio: obj.precio,
        };
      });

      return {
        id: person.id,
        nombres: person.nombres,
        apellidos: person.apellidos,
        documento: person.documento,
        telefono: person.telefono,
        email: person.email,
        edad: person.edad,
        imagen: person.imagen,
        promedio: person.promedio,
        genero: person.genero,
        publicaciones: publicacion,
        favoritos: person.favoritos,
        Profesions: person.Profesions?.map((e) => e.nombre).join(),
        logoProfesion: person.Profesions?.map((e) => e.logo).join(),
        direccion: person.Direccions?.map((e) => e.direccion).join(),
        ciudad: person.Direccions?.map((e) => e.ciudad).join(),
        pais: person.Direccions?.map((e) => e.pais).join(),
      };
    });

    let filtroPersonas = objPersonas;

    if (descripcion) {
      let obj = [];

      for (let i = 0; i < filtroPersonas.length; i++) {
        filtroPersonas[i].publicaciones.map((e) => {
          if (e.descripcion.includes(descripcion)) {
            let array = [];
            array.push({
              idPublicacion: e.idPublicacion,
              descripcion: e.descripcion,
              precio: e.precio,
            });

            obj.push({
              id: filtroPersonas[i].id,
              nombres: filtroPersonas[i].nombres,
              apellidos: filtroPersonas[i].apellidos,
              documento: filtroPersonas[i].documento,
              telefono: filtroPersonas[i].telefono,
              email: filtroPersonas[i].email,
              edad: filtroPersonas[i].edad,
              imagen: filtroPersonas[i].imagen,
              promedio: filtroPersonas[i].promedio,
              genero: filtroPersonas[i].genero,
              publicaciones: array,
              Profesions: filtroPersonas[i].Profesions,
              logoProfesion: filtroPersonas[i].logoProfesion,
              direccion: filtroPersonas[i].direccion,
              ciudad: filtroPersonas[i].ciudad,
              pais: filtroPersonas[i].pais,
            });
          }
        });
      }

      filtroPersonas = obj;
    }

    if (profesion) {
      filtroPersonas = filtroPersonas.filter((persona) => {
        return persona.Profesions.toLowerCase().includes(
          profesion.toLowerCase()
        );
      });
    }

    if (nombres) {
      filtroPersonas = filtroPersonas.filter((persona) => {
        return persona.nombres.toLowerCase().includes(nombres.toLowerCase());
      });
    }

    if (genero) {
      filtroPersonas = filtroPersonas.filter((persona) => {
        return persona.genero == genero;
      });
    }

    if (edad) {
      filtroPersonas = filtroPersonas.filter((persona) => persona.edad == edad);
    }

    if (promedio) {
      filtroPersonas = filtroPersonas.filter(
        (persona) => persona.promedio >= promedio
      );
    }

    if (ciudad) {
      filtroPersonas = filtroPersonas.filter(
        (persona) => persona.ciudad.toLowerCase() == ciudad.toLowerCase()
      );
    }

    return res.json(filtroPersonas);
  } catch (error) {
    next(error);
  }
});

router.get("/ciudades", (req, res) => {
  axios.get("http://localhost:3001/users").then((respuesta) => {
    let filtrados = [];
    let todos = respuesta.data;
    let ciudades = todos.map((e) => e.ciudad);
    ciudades.forEach((el) => {
      if (filtrados.indexOf(el) < 0) filtrados.push(el);
    });
    res.send(filtrados);
  });
});

router.get("/empleos", async (req, res, next) => {
  try {
    let consultaDB = await Profesion.findAll();
    let profesiones = consultaDB?.map((e) => e.dataValues.nombre);

    !profesiones.length
      ? res.status(404).send("NO HAY PROFESIONES EN LA BASE DE DATOS.")
      : res.json(profesiones);
  } catch (error) {
    next(error);
  }
});

router.get("/empleosForm", async (req, res, next) => {
  try {
    let consultaDB = await Profesion.findAll();
    let profesiones = consultaDB?.map((e) => e.dataValues);

    !profesiones.length
      ? res.status(404).send("NO HAY PROFESIONES EN LA BASE DE DATOS.")
      : res.json(profesiones);
  } catch (error) {
    next(error);
  }
});

// router.get("/:ocupacion", (req, res) => {
//   axios
//     .get("http://localhost:3001/users")
//     .then((respuesta) => {
//       let personas = respuesta.data;
//       let tuPersona = personas.filter((el) =>
//         el.descripcion
//           .toLowerCase()
//           .includes(req.params.ocupacion.toLowerCase())
//       );
//       if (!tuPersona.length) {
//         res.send([]);
//       }
//       if (tuPersona.length > 0) {
//         res.send(tuPersona);
//       }
//       res.end();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get("/trabajo/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    axios.get("http://localhost:3001/users").then((respuesta) => {
      let personas = respuesta.data;
      for (let i = 0; i < respuesta.data.length - 1; i++) {
        if (respuesta.data[i].id.toString() === id) res.send(personas[i]);
      }
    });
  } catch (error) {
    next.log(error);
  }
});

router.post("/crear", async function (req, res) {
  let profesionId = req.body.selected;

  let consultaBD = await Persona.findOne({
    where: { documento: req.body.input.documento },
  });

  if (consultaBD == null) {
    Persona.create({
      nombres: req.body.input.nombres,
      apellidos: req.body.input.apellidos,
      edad: req.body.input.edad,
      email: req.body.input.email,
      documento: req.body.input.documento,
      descripcion: req.body.input.descripcion,
      telefono: req.body.input.telefono,
      direccion: req.body.input.direccion,
      genero: req.body.input.genero,
      imagen: req.body.input.imagen,
    })
      .then(async (input) => {
        input.setProfesions(profesionId);
        console.log(profesionId)
        let PersonaId = await Persona.findOne({
          where: { documento: parseInt(input.documento) },
        });
        PersonaId = PersonaId.dataValues.id;

        await Publicacion.create({
          PersonaId: PersonaId,
          descripcion: req.body.input?.descripcion,
          precio: req.body.input?.precio,
        });
        return res.status(200).send(input);
      })
      .catch((error) => console.log(error));
  } else {
    let PersonaId = await Persona.findOne({
      where: { documento: parseInt(req.body.input.documento) },
    });
    PersonaId = PersonaId.dataValues.id;

    let publicacion = await Publicacion.create({
      PersonaId: PersonaId,
      descripcion: req.body.input?.descripcion,
      precio: req.body.input?.precio,
    });

    return res.send(publicacion);
  }
});

router.patch("/modificar/:id", async (req, res) => {
  const id = req.params.id;
  let { nombres, genero, edad, ciudad, descripcion, email } = req.query;
  // if (descripcion) {
  //   Persona.update({ descripcion: req.query.descripcion }, { where: { id: id } })
  // }
  if (nombres) {
    Persona.update({ nombres: req.query.nombres }, { where: { id: id } });
  }
  if (genero) {
    Persona.update({ genero: req.query.genero }, { where: { id: id } });
  }
  if (edad) {
    Persona.update({ edad: req.query.edad }, { where: { id: id } });
  }
  if (ciudad) {
    Persona.update({ ciudad: req.query.ciudad }, { where: { id: id } });
  }
  if (email) {
    Persona.update({ email: req.query.email }, { where: { id: id } });
  }
  const objetivo = await Persona.findOne({ where: { id: id } });
  res.send(objetivo);
});

router.get("/detalle/:idPublicacion", async (req, res, next) => {
  try {
    const { idPublicacion } = req.params;

    let consultaBD = await Publicacion.findByPk(idPublicacion);
    let idPersona = consultaBD.dataValues.PersonaId;
    let personaPost = await Persona.findAll({
      where: { id: idPersona },
      include: [Direccion, Profesion],
    });

    let obj = {
      nombres: personaPost[0].dataValues.nombres,
      apellidos: personaPost[0].dataValues.apellidos,
      imagen: personaPost[0].dataValues.imagen,
      edad: personaPost[0].dataValues.edad,
      genero: personaPost[0].dataValues.genero,
      puntaje: personaPost[0].dataValues.puntaje,
      documento: personaPost[0].dataValues.documento,
      descripcion: consultaBD.dataValues.descripcion,
      precio: consultaBD.dataValues.precio,
      Profesions: personaPost[0].Profesions[0].dataValues.nombre,
      direccion: personaPost[0].Direccions[0]?.dataValues.direccion,
      ciudad: personaPost[0].Direccions[0]?.dataValues.ciudad,
      pais: personaPost[0].Direccions[0]?.dataValues.pais,
    };

    res.send(obj);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
