const express = require('express');
const router = express.Router();
const {MensajeAdmin} = require('../db')
router.use(express.json());

router.post(('/user'), async(req,res)=>{
    try{
        const {email, mensaje} =req.body;
        if(!mensaje || !email){
            return res.send({message:'No se pudo enviar el mensaje'})
        } else{
        await MensajeAdmin.create({
            email,
            mensaje
        })
       }
        return res.json({message:'Mensaje enviado correctamente'})
    }catch(error){
        console.log(error)
    }
})

router.get(('/user'),async(req,res)=>{
    try{
        const delUsuarioAlAdmin = await MensajeAdmin.findAll();
        res.send(delUsuarioAlAdmin)
    }catch{
        res.json({message:'No se encontraron mensajes para mostrar'})
    }
})


module.exports = router;