process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1;
const express = require("express");
const router = express.Router();
const axios = require("axios");
const transporter = require('./transporter');
const { Persona, Profesion, Direccion, Publicacion } = require("../db");
const cors = require('cors');
router.use(cors());
router.use(express.json());

const mensajeActivacion = require("../mensajes/mensajeActivacion");

router.get("/", async (req, res, next) => {
  try {


    let personasDB = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
    });
    if (personasDB.length == 0)
      return res.send("LA BASE DE DATOS NO TIENE INFORMACION");

    let objPersonas = personasDB.map((person) => {

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
        baneado: person.baneado,
        notificaciones: person.notificaciones,
        chats: person.chats,
      };
    });

    return res.json(objPersonas);
  } catch (error) {
    next(error);
  }
});

router.get("/ciudades", async (req, res) => {
  let direcciones = await Direccion.findAll();
  let ciudades = direcciones.map(e => e.ciudad)
  ciudades = new Set(ciudades);
  return res.json(Array.from(ciudades));

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

router.get("/trabajo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    axios.get("http://localhost:3001/users").then((respuesta) => {
      let personas = respuesta.data;
      for (let i = 0; i < respuesta.data.length - 1; i++) {
        if (respuesta.data[i].id.toString() === id) res.send(personas[i]);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/crear", async function (req, res) {

  let { ciudad, descripcion, email, multimedia, precio, ProfesionId, titulo } = req.body.toSend;
  if (!ciudad || !descripcion || !email || !precio || !ProfesionId || !titulo) return

  let consulta = await Persona.findOne({
    where: { email: email },
  });

  let PersonaId = consulta?.dataValues.id;

  if (PersonaId) {
    ProfesionId = parseInt(ProfesionId)
    ciudad = parseInt(ciudad)
    await Publicacion.create({
      PersonaId,
      ProfesionId,
      descripcion,
      precio,
      titulo,
      multimedia,
      DireccionId: ciudad,
    });

    return res.send('Publicación creada');
  }
  res.status(404).send('No se pudo publicar');
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
        trabajosPagos: [],
        notificaciones: [],
        chats: [],
      });

      let message = {
        from: 'Finder Community <finder.app.henry@hotmail.com>',
        to: email,
        subject: 'Ahora eres FINDER ✔',
        html: mensajeActivacion(nombres)
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }
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
    if (!consulta.length) return res.status(404).send('No existe usuario con ese email.')
    if (
      consulta[0]?.edad == null ||
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
  let { nombres, apellidos, telefono, genero, edad, documento, chats } = req.query;

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
  if (chats) {
    Persona.update({ chats: req.query.chats }, { where: { email: email } });
  }

  const objetivo = await Persona.findOne({ where: { email: email } });
  res.send(objetivo);
});

router.patch('/add/:documento', async (req, res, next) => {
  try {
    const { documento } = req.params
    const { chat, name } = req.query
    const objeto = {
      chat: chat,
      name: name
    }
    const algo = [];


    let persona = await Persona.findOne({ where: { documento: documento } })
    if (persona === null) return res.status(404).send('No existe el usuario.');

    let chats = persona.dataValues.chats
    if (chats !== null) {
      chats.push(objeto)
      await Persona.update({ chats: chats }, { where: { documento: documento } });
      let p = await Persona.findOne({ where: { documento: documento } })
      return res.json(p)
    }
    algo.push(objeto)
    await Persona.update({ chats: algo }, { where: { documento: documento } });
    let p = await Persona.findOne({ where: { documento: documento } })
    return res.json(p)
  } catch (error) {
    next(error)
  }
});

router.patch('/agg/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { chat, name } = req.query
    const algo = [];
    const objeto = {
      chat: chat,
      name: name
    }


    let persona = await Persona.findOne({ where: { id: id } })
    if (persona === null) return res.status(404).send('No existe el usuario.');

    let chats = persona.dataValues.chats
    if (chats !== null) {
      chats.push(objeto)
      await Persona.update({ chats: chats }, { where: { id: id } });
      let p = await Persona.findOne({ where: { id: id } })
      return res.json(p)
    }
    algo.push(objeto)
    await Persona.update({ chats: algo }, { where: { id: id } });
    let p = await Persona.findOne({ where: { id: id } })
    return res.json(p)
  } catch (error) {
    next(error)
  }
});


router.get("/detalle/:idPublicacion", async (req, res, next) => {
  try {
    const { idPublicacion } = req.params;

    let consultaBD = await Publicacion.findByPk(idPublicacion, { include: [Profesion, Direccion] });
    if (consultaBD === null) return res.status(404).send('No existe esta publicación.');

    let idPersona = consultaBD.dataValues.PersonaId;
    let personaPost = await Persona.findAll({
      where: { id: idPersona }
    });

    let obj = {
      idPersona: personaPost[0].dataValues.id,
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
      logoProfesion: consultaBD.dataValues.Profesion.dataValues.logo,
      direccion: consultaBD.dataValues.Direccion.dataValues.direccion,
      ciudad: consultaBD.dataValues.Direccion.dataValues.ciudad,
      latitud: consultaBD.dataValues.Direccion.dataValues.latitud,
      longitud: consultaBD.dataValues.Direccion.dataValues.longitud,
      pais: consultaBD.dataValues.Direccion.dataValues.pais,
      multimedia: consultaBD?.dataValues?.multimedia,
      chats: personaPost[0].dataValues.chats,
      trabajosPagos: personaPost[0].dataValues.trabajosPagos
    };

    res.send(obj);

  } catch (error) {
    next(error);
  }
});

router.get("/prof/:id", (req, res) => {
  const id = req.params.id;
  axios.get("http://localhost:3001/users/detalle/" + id)
    .then((respuesta) => {
      let datos = respuesta.data;
      let quiero = datos.Profesions;
      res.send(quiero)
    })
})

router.get('/perfil/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    let consulta = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
      where: { email: email },
    });

    !consulta.length
      ? res.status(404).send('No existe usuario con este email.')
      : res.json(consulta);

  } catch (error) {
    next(error)
  }
});

router.get("/coincidencias/:id", async (req, res) => {
  const id = req.params.id;
  let respuesta = [];
  try {
    let todo = await axios.get(`http://localhost:3001/users/prof/${id}`)
    let tipo = todo.data;
    let todos = await Persona.findAll({
      include: [
        { model: Publicacion, include: [Direccion, Profesion] }
      ],
    });
    for (let i = 0; i < todos.length; i++) {
      for (let j = 0; j < todos[i].Publicacions.length; j++) {
        if (todos[i].Publicacions[j].Profesion.nombre === tipo) {
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
