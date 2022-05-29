import React, { useState } from "react";
import AdminMsj from "./AdminMsj";
import Dashboard from "./Dashboard";
import Usuarios from './Usuarios';
import s from './styles.module.css';
import logo from '../../assets/logo_finder_white.png';
import Error from '../Error'
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from '../../components/NavBar/NavBar';

export default function Admin(){
    const { user, isAuthenticated} = useAuth0();
    return(/* 
        isAuthenticated && user.email==='cami.zupanovich@gmail.com' ?

        ( */<div>
        <NavBar/>

        <div className={s.row}>
        <div className={s.navSeccionWidth}>
            <div className={s.navSeccion}>
            <a className={s.navItems} href='#1'>Soporte</a>
            <a className={s.navItems} href='#2'>Analisis</a>
            <a className={s.navItems} href='#3'>Usuarios</a>
            </div>
        </div>

        <div className={s.column}>
          <seccion id='1'><AdminMsj/></seccion>
          <seccion id='2'><Dashboard/></seccion>
          <seccion id='3'><Usuarios/></seccion>
        </div>

        </div>
        </div> /* ) : (<Error/>) */
    )
}