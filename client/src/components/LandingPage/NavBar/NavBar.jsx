import React, { useState } from "react";
import s from './NavBar.module.css';

export default function NavBar(){
// esto deberiamos manejarlo con redux, usar un selector en un current user o como lo definamos
    const [login,setLogin]=useState(true);  
    return (
        <div className={s.container}>
            <div className={s.appName}>
                NOMBRE APP
            </div>
            <ul className={s.list}>
                <li className={s.listItem}>OFRECER SERVICIO</li>
                <li className={s.listItem}>CONTRATAR</li>
                {login? <li className={s.listItem}>LOGOUT</li> : <li className={s.listItem}>LOGIN</li> }
                {login? <li className={`${s.listItem} ${s.profile}`}>PERFIL</li> : <li className={s.listItem}>REGISTRARSE</li>}
            </ul>
        </div>
    )
}