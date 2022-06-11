const express = require("express");
const router = express.Router();
const axios = require("axios");
const {Pregunta,Publicacion} = require('../db');
router.use(express.json());

router.get('/:idPublicacion', async(req,res)=>{
    try{
        const {idPublicacion}=req.params;
        let comments = await Pregunta.findAll({
            where: {
                PublicacionId: idPublicacion
            }
        })
        res.status(200).send(comments)
    }catch{
        res.json({message:"No se encontraron comentarios"})
    }
})




router.post('/', async(req,res)=>{
    try{
        const { pregunta, user, profesional,PublicacionId} =req.body;
        if(!pregunta || !user || !profesional){
            return res.send({message:"No se pudo realizar la consulta, intente mas tarde"})
        }else{
            await Pregunta.create({
                PublicacionId,
                pregunta,
                user,
                profesional
            })
        }
        return res.status(200).json({message:"tu consulta fue enviada con exito"})
    }catch{
        res.status(400).json({message:"Algo salio mal, intenta mas tarde!"})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        let {id}= req.params;
        let toDelete = await Pregunta.findOne({
            where:{
                id,
            }
        })
        await toDelete.destroy();
        res.status(200).json({message:"Comentario borrado con exito!"})
    }catch{
        res.status(400).json({message:"Algo salio mal !"})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        let {id} = req.params;
        let {respuesta} = req.body;
        await Pregunta.update({respuesta},{
            where:{
                id
            }
        })
        res.status(200).send('se respondio')
    }catch{
        res.status(400).send('no se pudo responder')
    }
})
module.exports=router;