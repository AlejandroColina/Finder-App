import React from "react";
import s from "./Perfil.module.css";
import img from "./assets/images.jpg";
import logo from "./assets/logo_finder_white.png";
import person from "./data";
import Card_perfil from "./Card_perfil/Card_perfil";
import Form from './form/Form'
import {useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
const Perfil = () => {
  const { isAuthenticated, user } = useAuth0();
 
 const [perfil, setPerfil] = useState(false)
 console.log(user)
  const handlePerfil = () =>{
    setPerfil(true)
  }

  const handleVolver = () => {
    setPerfil(false)
  }
  return (
    <div>
      <nav className={s.nav}>
        <img className={s.logo} src={logo} alt="finder" />
      </nav>
      <div className={s.portada}>
        <img
          className={s.img}
          src={"https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg"}
          alt="portada"
        />
      </div>
      <section className={s.perfil}>
        <div className={s.con_per}>
          <img className={s.imgper} src={person[0].imagen} alt="perfil" />
          <div className={s.nombre}>
            <h2>PERFIL</h2>
            <h1>{isAuthenticated ? user.name: person[0].nombres}</h1>
            <div className={s.flex}>
              <button  onClick={handlePerfil}>Editar perfil</button>
            </div>
            <button onClick={handleVolver } className={s.boton}>volver</button>
          </div>
        </div>
      </section>
      <section className={s.conten}>
        <div className={s.datos}>
          <h1 className={s.personal}>imformacion personal</h1>
          <div className={s.info}>
            <h2>nombre completo :</h2>
            <h2>{person[0].nombres}</h2>
            <h2>apellido :</h2>
            <h2>{person[0].apellidos}</h2>

            <h2>telefono :</h2>
            <h2>{person[0].telefono}</h2>
            <h2>email :</h2>
            <h2>{person[0].email}</h2>
            <h2>edad :</h2>
            <h2>{person[0].edad}</h2>
          </div>
        </div>
        <div className={s.publi}>
          { perfil ? <Form/> : <div> 
          <h2 className={s.h2}>Publicaciones</h2>
          <div className={s.centrar_publi}>
            {person[0].publicaciones.map((el) => (
              <Card_perfil
                precio={el.precio}
                descripcion={el.descripcion}
                nombre={person[0].nombres}
                imagen={person[0].imagen}
                Profesions={person[0].Profesions}
                id={el.id}
               />
            ))}
            </div>
            </div>}
        </div>
      </section>
      <footer>jose andres</footer>
    </div>
  );
};

export default Perfil;
