const express = require('express');
const router = express.Router();
router.use(express.json());
const app = require("express").Router();
const axios = require("axios");
const { Persona, Profesion } = require("../db");
const person = require('./data');
const tipos = require("./tipos")

router.get('/', async(req, res, next) => {
    let personasDB = await Persona.findAll({include:Profesion});
    if(personasDB.length > 0){
        res.send(personasDB)
    } else {
        let todos = [];
    for (let i = 0; i < person.length; i++) {
        if(todos.indexOf(person[i]) < 0) todos.push(person[i])
    }
     for (let i = 0; i < todos.length; i++) {
         Persona.create({
             nombres: todos[i].nombre,
             apellidos: todos[i].apellido,
             edad: todos[i].edad,
             pais: todos[i].pais,
             telefono: 1161330975,
             email: "fulanito@gmail.com",
             image: todos[i].imagen,
         })
     }
     res.send(todos)
    }   
});

router.get("/empleos", async (req,res)=>{
  let profeDB = await Profesion.findAll();
  if(profeDB.length > 0){
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

  router.get("/:ocupacion", (req,res) =>{
    axios.get("http://localhost:3001/users")
    .then((respuesta)=>{
        let personas = respuesta.data;
        let tuPersona = personas.filter((el) => el.ocupacion.toLowerCase().includes(req.params.ocupacion.toLowerCase()));
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
          for (let i = 0; i < personas.length -1; i++) {
            if(personas[i].id.toString() === id) res.send(personas[i])
          }
    })
   } catch (error) {
       console.log(error)
   }
})



  
module.exports = router;