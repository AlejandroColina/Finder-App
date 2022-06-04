import React from "react";
import s from './Card_perfil.module.css'
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
<<<<<<< HEAD
//import {eliminarPost} from '../../Redux/actions/index'
=======
// import {eliminarPost} from '../../Redux/actions/index'
>>>>>>> 6c33e7a818a592a555f2454e7447ec5a89837237
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

<<<<<<< HEAD
/*  const handleonClik = () =>{
  dispatch(eliminarPost(id))
 } */
=======
//  const handleonClik = () =>{
//   dispatch(eliminarPost(id))
//  }
>>>>>>> 6c33e7a818a592a555f2454e7447ec5a89837237
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

