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

  const handleOnClick = () => {
   
  }

  return (
    <div key={`${id}F`} className={s.container}>
      <button onClick={handleOnClick }>Favoritos</button>
      <header>
      
        <div className={s.bio}>
          <img src={logoProfesion} alt="background" className={s.bg} />

          <div className={s.desc}>
            <p>{descripcion}</p>
          </div>
        </div>

        <div className={s.avatarcontainer}>
          <img src={imagen} alt="avatar" className={s.avatar} />
          <div className={s.centrado}>
            <p className={s.nombre}>{nombres?.split(' ')[0]}</p>
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

            <li  className={s.listItem}>      
         <i class="fa-solid fa-location-dot" style={{color: 'brown', fontWeight: '600', marginRight:'6px', marginTop: '0px'}}></i>{ciudad}
            <li className={s.listItem} style={{marginTop: '10px', marginBottom: '7px'}}>             
             {estrellas?.map(() => <i style={{color: 'goldenrod', margin: '2px',}} class="fa-solid fa-star"></i>)}
            </li>

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
