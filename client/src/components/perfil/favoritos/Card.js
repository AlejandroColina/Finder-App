import React from "react";
import s from "./Cards.module.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {deleteFavorito, getFavoritos} from '../../Redux/actions/index'

export default function Cards({
  nombres,
  imagen,
  descripcion,
  promedio,
  Profesions,
  id,
  logoProfesion,
}) {

  const { user } = useAuth0();
  const dispatch = useDispatch();

const  handleDelete = () =>{
  dispatch(deleteFavorito(user?.email,id))
  setTimeout(() =>{ 
    dispatch(getFavoritos(user?.email))
  }, 500)
}

  return (
    <div className={s.container}>
      <header>
        <div className={s.bio}>
          <img src={logoProfesion} alt="background" className={s.bg} />

          <div className={s.desc}>
            <h3>descripcion</h3>
            <p>{descripcion}</p>
          </div>
        </div>

        <div className={s.avatarcontainer}>
          <img src={imagen} alt="avatar" className={s.avatar} />
          <p className={s.nombre}>{nombres}</p>
          <div className={s.hover}>
            <div className={s.icontwitter}></div>
          </div>
        </div>
      </header>

      <div className={s.content}>
        <div className={s.data}>
          <ul>
            <li>
              trabajos
              <p>{Profesions}</p>
            </li>
            <li>
              puntaje
              <p>{promedio}</p>
            </li>
          </ul>
        </div>

        <div className={s.follow}>
          <div className={s.icontwitter}></div>
        </div>
      </div>
      <div className={s.botones}>
        <button className={s.btnEliminar} onClick={handleDelete} >eliminar</button>
        
      </div>
    </div>
  );
}
