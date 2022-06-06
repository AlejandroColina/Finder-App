import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import s from './Comentar.module.css';
import { postOpinion } from '../../Redux/actions';
import { useDispatch } from 'react-redux';

export default function Comentar({nombre,publicacion}){
    const dispatch=useDispatch();
    const [input, setInput]= useState({
        persona:nombre,
        puntaje:'',
        comentario:'',
        PublicacionId:parseInt(publicacion)
    })

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (input,e)=>{
        e.preventDefault();
        dispatch(postOpinion(input));
        console.log(input);
    }
    return(
        <form className={s.form} onSubmit={(e)=>handleSubmit(input,e)}>
            <Box className={s.box}>
              <div className={s.title} >Que te parecio el servicio?</div>
              <Rating
               size="large" 
               name='puntaje'
               value={input.puntaje}
               onChange={(e)=>handleChange(e)}/>
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