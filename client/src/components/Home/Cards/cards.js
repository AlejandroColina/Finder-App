import React from "react";
import person from '../../../data'
import s from  './cards.module.css'
export default function Cards({nombre,  imagen}) {
    return (
       
    <div className={s.container}>
    <header>
      <div className={s.bio}>
        <img src="http://www.croop.cl/UI/twitter/images/up.jpg" alt="background" className={s.bg}/>
        <div className={s.desc}>
          <h3>descripción</h3>
          <p>Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.</p>
        </div>
      </div>

      <div className={s.avatarcontainer}>
        <img src={imagen} alt="avatar" className={s.avatar}/> 
         <p className={s.nombre}>{nombre}</p>
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
            <p>pintor</p>
          </li>
          <li>
           puntaje
            <p>1,5</p>
          </li>
           
        </ul>
      </div>

      <div className={s.follow}>
        <div className={s.icontwitter}></div>mas info
      </div>
    </div>

  </div>
        
  
    )
}