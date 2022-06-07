import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import s from './Comentar.module.css';

export default function Comentar({nombre,publicacion}){
    const [input, setInput]= useState({
        persona:{nombre},
        puntaje:'',
        comentario:'',
        PublicacionId:{publicacion}
    })

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return(
        <form className={s.form}><Box className={s.box}>
        <div className={s.title} >Que te parecio el servicio?</div>
        <Rating
          size="large" 
          name='puntaje'
          value={input.puntaje}
          onChange={(e)=>handleChange(e)}
        />
      </Box>
        <textarea name='comentario'
         className={s.input}
        rows='6'
        type='text'
        onChange={(e)=>handleChange(e)}
        value={input.comentario} required/>
        <input type='submit' className={s.btn}/>
        </form>
    )
}