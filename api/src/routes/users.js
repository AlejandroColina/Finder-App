const express = require('express');
const router = express.Router();
const person = require('./data');
router.use(express.json());
const app = require("express").Router();
const axios = require("axios");

router.get('/', (req, res, next) => {
    try {
        return res.json(person);
    } catch (error) {
        next(error);
    }
});

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