import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from './Card'
import s from './Fvorito.module.css'

const Favorito = () => {
  const favorito = useSelector((state) => state.favorito);
 
  return (
    <div className={s.conte}>
      {favorito &&
        favorito.map((el) => (
          <Cards
            nombre={el.nombre}
            imagen={el.imagen}
            descripcion={el.descripcion}
            Profesions={el.Profesions}
            id={el.id}
            logoProfesion={el.logoProfesion}
          />
        ))}
    </div>
  );
};

export default Favorito;
