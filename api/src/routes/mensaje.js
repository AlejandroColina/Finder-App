const express = require('express');
const router = express.Router();
const {MensajeAdmin} = require('../db');
const cors = require('cors');
router.use(cors());
router.use(express.json());

router.post(('/user'), async(req,res)=>{
    try{
        const {email, mensaje, source} =req.body;
        if(!mensaje || !email){
            return res.send({message:'No se pudo enviar el mensaje'})
        } else{
        await MensajeAdmin.create({
            email,
            mensaje,
            source
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

router.get(('/user/:id'),async(req,res)=>{
    const id = req.params.id;
    try{
        const msj = await MensajeAdmin.findOne({
            where:{
                id
            }
        });
        res.status(200).send(msj);
    }catch{
        res.json({message:"No se pudo cargar el mensaje"})
    }
})

router.put(('/user/:id'),async(req,res)=>{
    const id = req.params.id;
        let {read} =req.body
    try{
        await MensajeAdmin.update({read},{
            where:{
                id
            }
        });
        res.status(200).send('se abrio')
    }catch{
        res.status(400).send('no se pudo')
    }
})


module.exports = router;