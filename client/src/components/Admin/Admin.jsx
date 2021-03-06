import React, { useState } from "react";
import s from './styles.module.css';
import NavBar from '../../components/NavBar/NavBar';
import AdminMsj from "./soporte/AdminMsj";
import Dashboard from "./Dashboard";
import Usuarios from './usuarios/Usuarios';
import Reportes from "./reportes/Reportes";
import Error from '../Error'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getTotalUsersBytype,getAdminMsj,getUsersNoBaneados, getUsersBaneados, getUsers, 
    getPreguntasReportadas,getComentariosReportados,getTotalUsersByCity } from "../Redux/actions";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function Admin(){
    const { user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers());
        dispatch(getTotalUsersBytype());
        dispatch(getTotalUsersByCity());
        dispatch(getAdminMsj());
        dispatch(getUsersBaneados());
        dispatch(getUsersNoBaneados());
        dispatch(getPreguntasReportadas());
        dispatch(getComentariosReportados());
    },[dispatch]);

    //ESTADOS DE REDUX
    const users = useSelector(state=>state.users)
    const activos = useSelector(state=>state.noBaneados);
    const suspendidos = useSelector(state=>state.usuariosBaneados);
    const opiniones = useSelector((state) => state.opinionesReportadas);
    const preguntas = useSelector((state) => state.preguntasReportadas);

    return(

        isAuthenticated && (user.email==='giulianob94@hotmail.com'
        ||user.email==='nicosuasnavar@gmail.com'
        ||user.email==='jheinemberstithjn@ufps.edu.co'
        ||user.email==='gabrielcontegrand10@gmail.com'
        || user.email==='alejandro.colina@ucp.edu.co' 
        || user.email==='joseandrescolmenares02@gmail.com' 
        ||user.email==='cami.zupanovich@gmail.com')?

        ( <div className={s.container}>
            <Helmet><title>Admin - Finder</title></Helmet>
        <NavBar/>
        
            <div className={s.seccionLinks}>
            <a className={s.navItems} href='#1'>Soporte</a>
            <a className={s.navItems} href='#2'>Dashboard</a>
            <a className={s.navItems} href='#3'>Usuarios</a>
            <a className={s.navItems} href="#4"> Reportes</a>
            </div>

        <div className={s.containerComp}>
          <section id='1'><AdminMsj/></section>
          <section id='2'><Dashboard/></section>
          <section id='3'><Usuarios users={users} activos={activos} suspendidos={suspendidos}/></section>
        <section id="4"><Reportes preguntas={preguntas} opiniones={opiniones} /></section>
        </div>

        </div> ) : (<Error/>)
    )
}