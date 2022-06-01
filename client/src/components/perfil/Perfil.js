import React from "react";
import s from "./Perfil.module.css";
import img from "./assets/images.jpg";
const Perfil = () => {
  return (
    <div>
      <nav className={s.nav}>nav</nav>
      <div className={s.portada}>
        <img className={s.img} src={img} alt="portada" />
      </div>
      <section>
        <div className={s.perfil}>
          <img className={s.imgper} src={img} alt="perfil" />
        </div>
      </section>
    </div>
  );
};

export default Perfil;
