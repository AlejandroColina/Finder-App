import React from "react";
import s from "./cards.module.css";
import { Link } from "react-router-dom";
export default function Cards({
  nombres,
  imagen,
  descripcion,
  promedio,
  Profesions,
  id,
  logoProfesion,
  ciudad,
 
}) {
  
  let estrellas = []
  for (let i = 0; i < promedio; i++) {
    estrellas.push('estrellita')
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
          <div className={s.centrado}>
          <p className={s.nombre}>{nombres.split(' ')[0]}</p>
          </div>
          <div className={s.hover}>
            <div className={s.icontwitter}></div>
          </div>
        </div>
      </header>

      <div className={s.content}>
        <div >
          <ul className={s.data}>
            <li className={s.listItem}>             
              {Profesions}
            </li>
            <li className={s.listItem}>             
             {estrellas?.map(() => <i style={{color: 'goldenrod', margin: '2px'}} class="fa-solid fa-star"></i>)}
            </li>
            <li  className={s.listItem}>      
         <i style={{ color: 'brown', margin: '9px'}} class="fa-solid fa-house-chimney"></i>{ciudad}
            </li>
          </ul>
        </div>

          <Link to={`/trabajo/${id}`}>
        <div className={s.follow}>
          <div className={s.boton}>
          Más datos
          </div>

        </div>
        </Link>
      </div>
    </div>
  );
}
