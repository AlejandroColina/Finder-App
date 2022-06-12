import React, { useState } from "react";
import s from '../styles.module.css';
import { useDispatch, useSelector } from "react-redux";
import {getOneMsj,readMsj} from '../../Redux/actions';
import DetatilMsj from "./DetailMsj";

export default function AdminMsj (){
    const dispatch = useDispatch();
    const msj = useSelector((state)=>state.adminMjes)
    const [open,setOpen]= useState(false);
    const read ={ read: true}

  //  const readOne = useSelector((state)=>state.msjDetailAdmin);
    return(<div className={s.containerDash}>
            <div className={s.title}>BANDEJA DE ENTRADA</div>
            <table className={s.table} >
                <thead>
            <tr >
                    <td className={s.celdas} >{msj.length}</td>
                    <td className={s.celdas} >ASUNTO</td>
                    <td className={s.celdas} >FROM</td>
                    <td className={s.celdas} >FECHA</td>
                    <td className={s.celdas} >HORA</td>
            </tr></thead>
            <tbody>
            {
                msj ? msj.map((msj)=>
                <tr key={msj.id} onClick={()=>{
                    dispatch(readMsj(msj.id,read));
                    dispatch(getOneMsj(msj.id));
                    setOpen(true);}} >
                    <td className={s.celdaBtn} >{msj.read? <span className={s.readed}>☑</span> : <span>✉</span> }</td>
                    <td className={s.celdasMsj} >{msj.source}</td>
                    <td className={s.celdasMsj} >{msj.email}</td>
                    <td className={s.celdasMsj} >{msj.createdAt.slice(0,10)}</td>
                    <td className={s.celdasMsj} >{msj.createdAt.slice(11,19)}</td>
                </tr>) :
                <tr>
                    <td className={s.celdasMsj}> La Bandeja de mensajes esta vacia!</td>
                </tr>
            }</tbody>
            </table>
            {open? <><DetatilMsj/> <button className={s.closeReading} onClick={()=>setOpen(false)}>CERRAR</button></> : null}
            </div>
    )
}