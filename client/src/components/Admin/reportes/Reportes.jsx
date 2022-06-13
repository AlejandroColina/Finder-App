import React from 'react';
import Preguntas from './preguntas';
import Opiniones from './opiniones';
import s from './styles.module.css';

export default function Reportes({preguntas,opiniones}){

    return(
        <div className={s.containerDash}>
        <div className={s.title}>PREGUNTAS Y RESEÑAS REPORTADAS</div>
            <div className={s.gridContainer}>

                <div>
                    {preguntas.length>0 ? <Preguntas/> : 
                    <div className={s.nohay}>
                        <div className={s.circle}>
                            <div className={s.message}>No hay preguntas reportadas</div>
                            <div className={s.begood}>✔</div>
                        </div>
                    </div>}
                </div>

                <div>
                    {opiniones.length>0 ? <Opiniones/> : 
                    <div className={s.nohay}>
                        <div className={s.circle}>
                            <div className={s.message}>No hay reseñas reportadas</div>
                            <div className={s.begood}>✔</div>
                        </div>
                    </div>}
                </div>

            </div>
        </div>
    )
}