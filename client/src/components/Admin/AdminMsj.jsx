import React, { useState } from "react";
import s from './styles.module.css';
import { useSelector } from "react-redux";

export default function AdminMsj (){
    const msj = useSelector((state)=>state.adminMjes)
    const [input, setInput]= useState('');

    const handleChange =(e)=>{
        setInput(e);
    }
    const handleSubmit = (e)=>{
        //dispatch(SendRes(input));
    }
    console.log(msj[0]);
    return(
            <div className={s.wrap} >
            {msj?.map((msj)=>
            <form className={s.card} key={msj.id}>
                <div className={s.importantText}>{msj.email}</div>
                <div className={s.text}>"{msj.mensaje}"</div>
                <textarea placeholder='Responder' rows='2' className={s.textarea} onChange={(e)=>handleChange(e.target.value)}/>
                <input  className={s.btn} type='submit' value='Send'/>
            </form>)}
            </div>
    )
}