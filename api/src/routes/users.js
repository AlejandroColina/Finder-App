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
      include: [Direccion,
        { model: Publicacion, include: [Profesion] }
      ],
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
        publicaciones: person.Publicacions,
        favoritos: person.favoritos,
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

  let { ciudad, descripcion, email, multimedia, precio, ProfesionId, titulo } = req.body.toSend;

  let consulta = await Persona.findOne({
    where: { email: email },
  });

  let PersonaId = consulta?.dataValues.id;

  if (PersonaId) {
    ProfesionId = parseInt(ProfesionId)

    await Publicacion.create({
      PersonaId,
      ProfesionId,
      descripcion,
      precio,
      titulo,
      multimedia: ['https://www.monempresarial.com/wp-content/uploads/2018/12/LEGAL-738x410.jpg']
    });

    await Direccion.create({
      PersonaId: PersonaId,
      ciudad: ciudad,
      pais: 'Argentina',
      direccion: 'Calle principal'
    });

    return res.send('Publicación creada');
  }
  res.status(404).send('No se pudo publicar')

});

router.post('/nuevo', async (req, res, next) => {
  try {
    const { nombres, email, imagen, apellidos } = req.body;
    let consulta = await Persona.findOne({
      where: {
        email: email
      }
    });

    if (consulta == null) {
      let persona = await Persona.create({
        nombres,
        apellidos,
        email,
        imagen,
        favoritos: [],
        trabajosPagos: []
      });
      return res.json(persona)
    } else {
      return res.json(consulta)
    }

  } catch (error) {
    next(error)
  }
});

router.get('/validar/:email', async (req, res, next) => {
  try {
    const { email } = req.params;

    let consulta = await Persona.findAll({
      where: { email: email }
    });

    if (
      consulta[0]?.apellidos == null ||
      consulta[0]?.documento == null ||
      consulta[0]?.telefono == null
    ) { res.send(true) } else {
      res.send(false);
    }
  } catch (error) {
    next(error)
  }
});

router.patch("/modificar/:email", async (req, res) => {
  const email = req.params.email;
  let { nombres, apellidos, telefono, genero, edad, ciudad, documento, direccion } = req.query;

  if (direccion) {
    let persona = await Persona.findOne({ where: { email: email } });
    await Direccion.update({ direccion: direccion }, { where: { PersonaId: persona.dataValues.id } });
  }

  if (ciudad) {
    let persona = await Persona.findOne({ where: { email: email } });
    await Direccion.update({ ciudad: ciudad }, { where: { PersonaId: persona.dataValues.id } });
  }

  if (documento) {
    Persona.update({ documento: req.query.documento }, { where: { email: email } })
  }
  if (apellidos) {
    Persona.update({ apellidos: req.query.apellidos }, { where: { email: email } })
  }
  if (telefono) {
    Persona.update({ telefono: req.query.telefono }, { where: { email: email } })
  }
  if (nombres) {
    Persona.update({ nombres: req.query.nombres }, { where: { email: email } });
  }
  if (genero) {
    Persona.update({ genero: req.query.genero }, { where: { email: email } });
  }
  if (edad) {
    Persona.update({ edad: req.query.edad }, { where: { email: email } });
  }
  if (ciudad) {
    Persona.update({ ciudad: req.query.ciudad }, { where: { email: email } });
  }

  const objetivo = await Persona.findOne({ where: { email: email } });
  res.send(objetivo);
});

router.get("/detalle/:idPublicacion", async (req, res, next) => {
  try {
    const { idPublicacion } = req.params;

    let consultaBD = await Publicacion.findByPk(idPublicacion, { include: [Profesion] });

    let idPersona = consultaBD.dataValues.PersonaId;
    let personaPost = await Persona.findAll({
      where: { id: idPersona },
      include: [
        Direccion,
        { model: Publicacion, include: [Profesion] }
      ],
    });

    let obj = {
      idPersona:personaPost[0].dataValues.id,
      nombres: personaPost[0].dataValues.nombres,
      apellidos: personaPost[0].dataValues.apellidos,
      imagen: personaPost[0].dataValues.imagen,
      edad: personaPost[0].dataValues.edad,
      genero: personaPost[0].dataValues.genero,
      puntaje: personaPost[0].dataValues.puntaje,
      documento: personaPost[0].dataValues.documento,
      email: personaPost[0].dataValues.email,
      promedio: personaPost[0].dataValues.promedio,
      telefono: personaPost[0].dataValues.telefono,
      titulo: consultaBD.dataValues.titulo,
      descripcion: consultaBD.dataValues.descripcion,
      precio: consultaBD.dataValues.precio,
      Profesions: consultaBD.dataValues.Profesion.dataValues.nombre,
      direccion: personaPost[0].Direccions[0]?.dataValues.direccion,
      ciudad: personaPost[0].Direccions[0]?.dataValues.ciudad,
      pais: personaPost[0].Direccions[0]?.dataValues.pais,
    };

    res.send(obj);
  } catch (error) {
    next(error);
  }
});

router.get('/perfil/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    let consulta = await Persona.findAll({
      include: [
        Direccion,
        { model: Publicacion, include: [Profesion] }
      ],
      where: { email: email },
    });

    return res.json(consulta);

  } catch (error) {
    next(error)
  }
});

router.get("/coincidencias/:tipo", async (req, res) =>{
  const tipo = req.params.tipo;
  let respuesta = [];
  try {
    let todos = await Persona.findAll({
      include: [
        Direccion,
        { model: Publicacion, include: [Profesion] }
      ],
    });
    for (let i = 0; i < todos.length; i++) {
      for (let j = 0; j < todos[i].Publicacions.length; j++) {
        if(todos[i].Publicacions[j].Profesion.nombre === tipo){
          respuesta.push(todos[i])
        }
        
      }
      
    }
    res.send(respuesta)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
