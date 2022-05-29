import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { userMsj } from "../Redux/actions";
import s from './Help.module.css';
import {Link} from 'react-router-dom';

export default function Help(){
    const dispatch = useDispatch();
    const { user, isAuthenticated} = useAuth0();
    const [options,setOptions]=useState(false);
    const [input, setInput]= useState('');

    const handleChange =(e)=>{
        setInput(e);
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        dispatch(userMsj({userId:user.id,message:input}));
        alert('Mensaje enviado con exito')
        setOptions(false);
    }
    return(
        <>
        {isAuthenticated? 
        <button title='Necesitas ayuda?' className={`${s.btn} ${s.position}`} onClick={()=>{setOptions(true)}}>?</button> 
        : 
        <Link to='/#2' className={`${s.contacto} ${s.position}`}>⤏ Emprende con <strong>Finder</strong> ⤎</Link>} 
        {options? 
        <form className={`${s.chat} ${s.position}`} onSubmit={handleSubmit}>
            
            <div className={s.cancelCont}>
            <button 
            className={s.cancel}
            onClick={()=>setOptions(false)}>X</button>
            </div>

            <label className={s.label} htmlFor="mensaje">
                Enviamos tu consulta, que a la brevedad un representante se comunicara con vos!
            </label>

            <textarea 
            required
            className={s.textarea}
            name='mensaje'
            placeholder='Escribe tu mensaje..' 
            onChange={(e)=>handleChange(e.target.value)}
            rows='3'/>

            <input 
            className={s.submit}
            type='submit' 
            value='Enviar'/>

        </form> :null}
        </>
    )
}