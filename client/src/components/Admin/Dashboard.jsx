import React from "react";
import s from './styles.module.css';

export default function Dashboard(){
    return(
        <div className={s.container}>
        <div className={s.containerDash}>
            <div className={s.importantText}>Suscripciones</div>
            <div className={s.text}>32 usuarios</div>
        </div>
        </div>
    )
}