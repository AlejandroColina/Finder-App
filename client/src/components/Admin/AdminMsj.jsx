import React, { useState } from "react";
import s from './styles.module.css';
//con un form tomamos el valor del mensaje y en el submit le adjuntamos el id entonces quedaria un onsubmit
// ()=>{dispatch(SendAndmin([user.id,input]))}
//primero el usuario despacha un mensaje con una accion que envia el payload => [userId,message]
//en el reducer seria manejar un estado => AdminMsj=[]
//case MSJE_AL_ADMIN:
//var obj={userId:action.payload[0],message:action.payload[1]}
//AdminMsj.push(obj);
//return{
//    ...state,
//}

export default function AdminMsj (){
    //aca en vez de este estado local provisorio iria un useSelector((state)=>state.AdminMsj)
    const [msj,setMsj] = useState([
        {userId:1,message:"No vino el emprendedor"},
        {userId:2,message:"me robaron"},
        {userId:3,message:"quiero cancelar"},
        {userId:4,message:"No vino el emprendedor"},
        {userId:5,message:"No vino el emprendedor"},
    ])
    const [input, setInput]= useState('');

    const handleChange =(e)=>{
        setInput(e);
    }
    const handleSubmit = (e)=>{
        //dispatch(SendRes(input));
    }
    return(
        <div className={s.container}>
            <div className={s.containerDash}>
            {msj?.map((msj,i)=>
            <form className={s.card} key={i}>
                <div className={s.importantText}>Mensaje del Usuario {msj.userId}</div>
                <div className={s.text}>"{msj.message}"</div>
                <textarea placeholder='Responder' rows='2' className={s.textarea} onChange={(e)=>handleChange(e.target.value)}/>
                <input  className={s.btn} type='submit' value='Send'/>
            </form>)}
            </div>
        </div>
    )
}