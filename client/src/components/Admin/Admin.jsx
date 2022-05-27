import React from "react";
import AdminMsj from "./AdminMsj";
import Dashboard from "./Dashboard";
import s from './styles.module.css';
import logo from '../../assets/logo_finder_white.png';

export default function Admin(){
    return(
        <>
        <div className={s.navBar}>
            <img  className={s.img} src={logo} alt='finder' />
        </div>
        <div className={s.row}>
        <div className={s.navSeccionWidth}>
            <div className={s.navSeccion}>
            <a className={s.navItems} href='#1'>Soporte</a>
            <a className={s.navItems} href='#2'>Analisis</a>
            </div>
        </div>
        <div className={s.column}>
        <seccion id='1'><AdminMsj/></seccion>
        <seccion id='2'><Dashboard/></seccion>
        </div>
        </div>
        </>
    )
}