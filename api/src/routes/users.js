const express = require('express');
const router = express.Router();
router.use(express.json());
const app = require("express").Router();
const axios = require("axios");
const { Persona, Profesion } = require("../db");
const person2 = require("./data")
const tipos = require("./tipos")

router.get('/', async (req, res, next) => {
  let personasDB = await Persona.findAll({ include: Profesion });
  if (personasDB.length > 0) {
    res.send(personasDB)
  } else {
    let todos = [];
    for (let i = 0; i < person2.length; i++) {
      if (todos.indexOf(person2[i]) < 0) todos.push(person2[i])
    }
    for (let i = 0; i < todos.length; i++) {
      //  const puntos = todos[i].puntuacion;
      //  const promedio = 0
      //  for (let j = 0; j < puntos.length; j++) {
      //    promedio += puntos[j]; 
      //  }
      Persona.create({
        nombres: todos[i].nombres,
        apellidos: todos[i].apellidos,
        edad: todos[i].edad,
        pais: todos[i].pais,
        telefono: 1161330975,
        email: "fulanito@gmail.com",
        image: todos[i].imagen,
        documento: 384759844,
        descripcion: todos[i].descripcion,
        puntuacion: [4, 3, 3],
        promedio: parseInt((4 + 3 + 3) / 3)
      })
    }
    res.send(todos)
  }
});

router.get("/empleos", async (req, res) => {
  let profeDB = await Profesion.findAll();
  if (profeDB.length > 0) {
    res.send(profeDB)
  } else {
    for (let i = 0; i < tipos.length; i++) {
      Profesion.create({
        nombre: tipos[i]
      })
    }
    res.send(tipos)
  }
})

<<<<<<< HEAD
  router.get("/:ocupacion", (req,res) =>{
    axios.get("http://localhost:3001/users")
    .then((respuesta)=>{
        let personas = respuesta.data;
        let tuPersona = personas.filter((el) => el.descripcion.toLowerCase().includes(req.params.ocupacion.toLowerCase()));
        if (!tuPersona.length){
          res.send([]);
        }
        if(tuPersona.length > 0){
          res.send(tuPersona)
        }
        res.end();
      })
       .catch((error)=>{
        console.log(error);
      })
})

router.get("/trabajo/:id", async (req,res) => {
   const id = req.params.id;
   try {
    axios.get("http://localhost:3001/users")
    .then((respuesta)=>{
        let personas = respuesta.data;
          for (let i = 0; i < respuesta.data.length -1; i++) {
            if(respuesta.data[i].id === id) res.send(personas[i])
          }
=======
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
>>>>>>> cef0be2617a0e5564b4d49c31611fe328a8ebce5
    })
    .catch((error) => {
      console.log(error);
    })
})

router.get("/trabajo/:id", async (req, res) => {
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
    console.log(error)
  }
})




module.exports = router;