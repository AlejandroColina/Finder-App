import React from "react";
import s from './Card_perfil.module.css'
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
//import {eliminarPost} from '../../Redux/actions/index'
export default function Cards({
  nombres,
  imagen,
  descripcion,
  promedio,
  Profesions,
  id,
  logoProfesion,
}) {
 const dispatch = useDispatch();

/*  const handleonClik = () =>{
  dispatch(eliminarPost(id))
 } */
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
        <button>eliminar</button>
        <button>editar</button>
      </div>
    </div>
  );
}

