import React, { useEffect } from "react";
import s from './styles.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { rederCard } from "../Redux/actions";

export default function Usuarios(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(rederCard())
    },[dispatch])
    const usuarios = useSelector((state)=>state.trabajadores)
    return(
        <div className={s.container}>
        <div className={s.usuariosInfo}>
        <div className={s.blueImportant}> Total de Usuarios: {usuarios.length}</div>
            <form className={s.formSearchUser}>
                <input className={s.textarea} type='text' placeholder='Buscar Usuario'/>
                <input className={s.btn} type='submit' value='buscar'/>
            </form>
        </div>
        <div className={s.usuariosInfo}>
            <div>
                {usuarios?.map((user)=>{
                    return(
                  <div key={user.id} className={s.row}>
                      <div>{user.id}</div>
                      <div>{user.nombres}</div>
                      <div>{user.email}</div>
                      <div>{user.telefono}</div>
                      <div>{user.documento}</div>
                  </div>)
                })}
            </div>
        </div>
        </div>
    )
}