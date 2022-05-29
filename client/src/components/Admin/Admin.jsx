import React, { useState } from "react";
import s from './styles.module.css';
import NavBar from '../../components/NavBar/NavBar';
import AdminMsj from "./AdminMsj";
import Dashboard from "./Dashboard";
import Usuarios from './Usuarios';
import Error from '../Error'
import { useAuth0 } from "@auth0/auth0-react";

export default function Admin(){
    const { user, isAuthenticated} = useAuth0();
    return(/* 
        isAuthenticated && user.email==='cami.zupanovich@gmail.com' ?

        ( */<div>
        <NavBar/>
         
        <div className={s.row}>
        
            <div className={` ${s.seccionLinks} ${s.column}`}>
            <a className={s.navItems} href='#1'>Soporte</a>
            <a className={s.navItems} href='#2'>Dashboard</a>
            <a className={s.navItems} href='#3'>Usuarios</a>
            </div>

        <div className={s.containerComp}>
          <seccion id='1'><AdminMsj/></seccion>
          <seccion id='2'><Dashboard/></seccion>
          <seccion id='3'><Usuarios/></seccion>
        </div>

        </div>
        </div> /* ) : (<Error/>) */
    )
}