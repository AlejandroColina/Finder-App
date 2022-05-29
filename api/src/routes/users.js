const express = require('express');
const router = express.Router();
const axios = require("axios");
const { Persona, Profesion, Direccion } = require("../db");
router.use(express.json());

router.get('/', async (req, res, next) => {


  try {

    let { profesion, nombres, promedio, genero, edad, ciudad, descripcion } = req.query;


    let personasDB = await Persona.findAll({ include: [Profesion, Direccion] });
    if (personasDB.length == 0) return res.send('LA BASE DE DATOS NO TIENE INFORMACION');

    let objPersonas = personasDB.map(person => {

      return {
        id: person.id,
        nombres: person.nombres,
        apellidos: person.apellidos,
        documento: person.documento,
        telefono: person.telefono,
        email: person.email,
        edad: person.edad,
        imagen: person.imagen,
        descripcion: person.descripcion,
        promedio: person.promedio,
        genero: person.genero,
        Profesions: person.Profesions?.map(e => e.nombre).join(),
        logoProfesion: person.Profesions?.map(e => e.logo).join(),        
        direccion: person.Direccions?.map(e => e.direccion).join(),
        ciudad: person.Direccions?.map(e => e.ciudad).join(),
        pais: person.Direccions?.map(e => e.pais).join()
      }
    });

    let filtroPersonas = objPersonas;
    if (profesion) {
      filtroPersonas = filtroPersonas.filter(persona => {
        return persona.Profesions.toLowerCase().includes(profesion.toLowerCase())
      });
      // !filtroPersonas.length
      //   ? res.send('NO HAY CONCIDENCIAS')
      //   : res.json(filtroPersonas);
    }
    if (descripcion) {
      filtroPersonas = filtroPersonas.filter(persona => {
        return persona.descripcion.toLowerCase().includes(descripcion.toLowerCase())
      });
      // !filtroPersonas.length
      //   ? res.send('NO HAY CONCIDENCIAS')
      //   : res.json(filtroPersonas);
    }


    if (nombres) {
      filtroPersonas = filtroPersonas.filter(persona => {
        return persona.nombres.toLowerCase().includes(nombres.toLowerCase())
      });
      // !filtroPersonas.length
      //   ? res.send('NO HAY CONCIDENCIAS')
      //   : res.json(filtroPersonas);
    }

    if (genero) {
      filtroPersonas = filtroPersonas.filter(persona => {
        return persona.genero == genero
      });

      // !filtroPersonas.length
      //   ? res.send('NO HAY CONCIDENCIAS')
      //   : res.json(filtroPersonas);
    }

    if (edad) {
      filtroPersonas = filtroPersonas.filter(persona => persona.edad == edad);
      // if (!filtroPersonas.length) {
      //   res.send('NO HAY CONCIDENCIAS')
      // } else {
      //   res.json(filtroPersonas)
      // }
    }

    if (promedio) {
      filtroPersonas = filtroPersonas.filter(persona => persona.promedio >= promedio);
      // !filtroPersonas.length
      //   ? res.send('NO HAY CONCIDENCIAS')
      //   : res.json(filtroPersonas);
    }
    if(ciudad){
      filtroPersonas = filtroPersonas.filter(persona => persona.ciudad.toLowerCase() == ciudad.toLowerCase())
    }



    // if (!Object.keys(req.query).length) 
    return res.json(filtroPersonas);



  } catch (error) {
    next(error)
  }
});

router.get("/ciudades",  (req, res) =>{
  axios.get("http://localhost:3001/users")
  .then((respuesta)=>{
    let filtrados = [];
    let todos = respuesta.data;
    let ciudades = todos.map(e => e.ciudad)
    ciudades.forEach((el)=>{
      if(filtrados.indexOf(el)<0) filtrados.push(el)
    })
    res.send(filtrados)
  })
})

router.get("/empleos", async (req, res, next) => {
  try {

    let consultaDB = await Profesion.findAll();
    let profesiones = consultaDB?.map(e => e.dataValues.nombre);

    !profesiones.length
      ? res.status(404).send('NO HAY PROFESIONES EN LA BASE DE DATOS.')
      : res.json(profesiones);

  } catch (error) {
    next(error)
  }
});

router.get("/:ocupacion", (req, res) => {
  axios.get("http://localhost:3001/users")
    .then((respuesta) => {
      let personas = respuesta.data;
      let tuPersona = personas.filter((el) => el.descripcion.toLowerCase().includes(req.params.ocupacion.toLowerCase()));
      if (!tuPersona.length) {
        res.send([]);
      }
      if (tuPersona.length > 0) {
        res.send(tuPersona)
      }
      res.end();
    })
    .catch((error) => {
      console.log(error);
    })
})



router.get("/trabajo/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    axios.get("http://localhost:3001/users")
      .then((respuesta) => {
        let personas = respuesta.data;
        for (let i = 0; i < respuesta.data.length - 1; i++) {
          if (respuesta.data[i].id.toString() === id) res.send(personas[i])
        }
      })
  } catch (error) {
    next.log(error)
  }
})

module.exports = router;
