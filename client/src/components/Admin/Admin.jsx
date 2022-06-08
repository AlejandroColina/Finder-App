import React, { useState } from "react";
import s from './styles.module.css';
import NavBar from '../../components/NavBar/NavBar';
import AdminMsj from "./AdminMsj";
import Dashboard from "./Dashboard";
import Usuarios from './Usuarios';
import Error from '../Error'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getTotalUsersBytype,getAdminMsj } from "../Redux/actions";
import { Helmet } from "react-helmet";

export default function Admin(){
    const { user, isAuthenticated} = useAuth0();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTotalUsersBytype());
        dispatch(getAdminMsj());
    },[dispatch]);
    return(

        isAuthenticated && user.email==='giulianob94@hotmail.com'
        ||isAuthenticated && user.email==='nicosuasnavar@gmail.com'
        ||isAuthenticated && user.email==='jheinemberstithjn@ufps.edu.co'
        ||isAuthenticated && user.email==='gabrielcontegrand10@gmail.com'
        ||isAuthenticated && user.email==='alejandro.colina@ucp.edu.co' 
        ||isAuthenticated && user.email==='josecolmenares96@hotmail.com' 
        || isAuthenticated && user.email==='cami.zupanovich@gmail.com'?

        ( <div className={s.container}>
            <Helmet><title>Admin - Finder</title></Helmet>
        <NavBar/>
        
            <div className={s.seccionLinks}>
            <a className={s.navItems} href='#1'>Soporte</a>
            <a className={s.navItems} href='#2'>Dashboard</a>
            <a className={s.navItems} href='#3'>Usuarios</a>
            </div>

        <div className={s.containerComp}>
          <section id='1'><AdminMsj/></section>
          <section id='2'><Dashboard/></section>
          <section id='3'><Usuarios/></section>
        </div>

        </div> ) : (<Error/>)
    )
}