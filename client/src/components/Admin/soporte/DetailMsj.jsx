import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import s from '../styles.module.css';

export default function DetatilMsj(){
    const dispatch = useDispatch();
    const [input, setInput]= useState('')
    const handleChange =(e)=>{
        setInput(e);
    }
    const readOne = useSelector((state)=>state.msjDetailAdmin);
    const handleSubmit = (e)=>{
        //dispatch(SendRes(input));
    }/* 
    var hora =readOne.createdAt.slice(11,19);*/
    //var fecha =readOne.createdAt.slice(0,10); 
   // console.log(fecha);
    return(
        <div className={s.containerReading}>
                {/* <div className={s.text}>{readOne.createdAt.slice(11,19)}</div> */}
                <div className={s.mail} >{readOne.email}</div>
                <p>"{readOne.mensaje}"</p>
        <form key={readOne.id}>
            <textarea className={s.textarea} placeholder='Responder' rows='3'onChange={(e)=>handleChange(e.target.value)}/>
            <input className={s.btn} type='submit' value='Send'/>
        </form>
        </div>
    )
}