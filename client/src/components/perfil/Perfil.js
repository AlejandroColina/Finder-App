import React from "react";
import s from "./Perfil.module.css";
import img from "./assets/images.jpg";
import logo from './assets/logo_finder_white.png'
import person from "./data";
const Perfil = () => {
  return (
    <div>
      <nav className={s.nav}>
       <img className={s.logo} src={logo} />
      </nav>
      <div className={s.portada}>
        <img
          className={s.img}
          src={"https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg"}
          alt="portada"
        />
      </div>
      <section>
        <div className={s.perfil}>
          <img className={s.imgper} src={img} alt="perfil" />
          <div className={s.nombre}>
            <h2>PERFIL</h2>
            <h1>diego armando maradona</h1>
          </div>
        </div>
      </section>
      <section className={s.conten}>
        <div className={s.datos}>datos</div>
        <div className={s.publi}>
          <h2 className={s.h2}>Publicaciones</h2>
          <div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Perfil;
