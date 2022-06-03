import React from "react";
import s from "./Card_perfil.module.css";
const Card_perfil = ({ nombre, precio, descripcion, imagen, Profesions, id }) => {

 const handleonClik = (id) =>{
    
 }


  return (
    <div className={s.contenedor}>
      <div className={s.centrar}>
        <img className={s.img} src={imagen} />
        <h3>{nombre}</h3>
      </div>
      <h3 className={s.h3}>Descripcion:</h3>
      <h2  className={s.h3}>{Profesions}</h2>
      <div className={s.descripcion}>
      <h1>{descripcion}</h1>
      <h2 className={s.h2}>precio: {precio}</h2>
      </div>
      <div className={s.conte}>
          <button>Eliminar</button>
          <button>Editar</button>
      </div>
    </div>
  );
};

export default Card_perfil;
