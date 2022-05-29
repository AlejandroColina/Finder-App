import React, { useState } from "react";
import s from './styles.module.css';
import { useSelector } from "react-redux";

export default function AdminMsj (){
    const msj = useSelector((state)=>state.adminMjes)
  /*   const [msj,setMsj] = useState([
        {userId:1,message:"No vino el emprendedor"},
        {userId:2,message:"me robaron"},
        {userId:3,message:"quiero cancelar"},
        {userId:4,message:"No vino el emprendedor"},
        {userId:5,message:"No vino el emprendedor"},
    ]) */
    const [input, setInput]= useState('');

    const handleChange =(e)=>{
        setInput(e);
    }
    const handleSubmit = (e)=>{
        //dispatch(SendRes(input));
    }
    return(
            <div className={s.wrap} >
            {msj?.map((msj,i)=>
            <form className={s.card} key={i}>
                <div className={s.importantText}>Mensaje del Usuario {msj.userId}</div>
                <div className={s.text}>"{msj.message}"</div>
                <textarea placeholder='Responder' rows='2' className={s.textarea} onChange={(e)=>handleChange(e.target.value)}/>
                <input  className={s.btn} type='submit' value='Send'/>
            </form>)}
            </div>
    )
}