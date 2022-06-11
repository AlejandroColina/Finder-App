import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import s from './Comentar.module.css';
import { postOpinion, sendNoti } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

export default function Comentar({profesional,publicacion, setComento}){
    const dispatch=useDispatch();
    const [input, setInput]= useState({
        profesional:profesional,
        puntaje:'',
        comentario:'',
        PublicacionId:parseInt(publicacion)
    })
    let email = profesional[0];
    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (input,e)=>{
        e.preventDefault();
        dispatch(postOpinion(input));
        dispatch(sendNoti(email,input));
        Swal.fire({ text:'Gracias por tu recomendacion!', icon:'success' } );
        setComento(true);
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