import React,{useState} from 'react';
import s from './Preguntar.module.css';

export default function Preguntar({nombre,publicacion}){
    const [input, setInput]= useState({
        persona:{nombre},
        pregunta:'',
        PublicacionId:publicacion
    })

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return(
        <form className={s.form}>
        <div className={s.title} >Consulta antes de contratar!</div>
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