const express = require("express");
const router = express.Router();
const axios = require("axios");
const {Comentario,Publicacion} = require('../db');
const cors = require('cors');
router.use(cors());
router.use(express.json());

router.get('/:idPublicacion', async(req,res)=>{
    try{
        const {idPublicacion}=req.params;
        let comments = await Comentario.findAll({
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
        const {puntaje, comentario, persona,PublicacionId} =req.body;
        
        if(!puntaje || !comentario || !profesional){
            return res.send({message:"No se pudo comentar la publicacion, intente mas tarde"})
        }else{
            await Comentario.create({
                PublicacionId,
                puntaje: parseInt(puntaje),
                comentario,
                profesional,
                reportado:false
            })
        }
        return res.status(200).json({message:"Gracias por tu comentario !"})
    }catch{
        res.status(400).json({message:"Algo salio mal, intenta mas tarde!"})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        let {id}= req.params;
        let toDelete = await Comentario.findOne({
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


router.put('reportar/:id', async(req,res)=>{
    try{
        let {id} = req.params;
        await Comentario.update({reportado:true,},{
            where:{
                id
            }
        })
        res.status(200).send('se reporto')
    }catch{
        res.status(400).send('no se pudo reportar')
    }
})

router.put('ignorar/:id', async(req,res)=>{
    try{
        let {id} = req.params;
        await Comentario.update({reportado:false,},{
            where:{
                id
            }
        })
        res.status(200).send('se ignoro el reporte')
    }catch{
        res.status(400).send('no se pudo ignorar el reporte')
    }
})

router.get('reportadas', async(req,res)=>{
    try{ 
        const comentariosRepo =await Comentario.findAll({
                where: {
                    reportado: true
                }
        });
        res.status(200).send(comentariosRepo)
    }catch{
        res.status(400).send('no funciona')
    }
})
module.exports=router;