import React from "react";
import person from '../../../data'
import s from  './cards.module.css'
export default function Cards({nombre,  imagen}) {
    return (
        <div >
    <div className={s.card}>
  <div className={s.cardbordertop}>
  </div>
   <img  className={s.img} src={imagen} alt='img' />
  <span>{nombre}</span>
  <p className={s.job}>profesor</p>
  <button className={s.button}> Click
  </button>
</div>
        </div>
    )
}