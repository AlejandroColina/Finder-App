import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePregunta, ignorarReportarPregunta } from "../../Redux/actions";
import s from './styles.module.css';
import {Link} from 'react-router-dom'

export default function Preguntas({preguntas}) {
  const dispatch = useDispatch();
  //const preguntas = useSelector((state) => state.preguntasReportadas);
  return (
    <div className={s.gridCol}>
    <div className={s.sub}>PREGUNTAS</div>
      {preguntas
        ? preguntas.map((p) => (
              <div className={s.column} key={p.id}>
                <div className={s.gridItem}>
                  <button className={s.btnDelete}
                   onClick={(e) => {
                    e.preventDefault();
                    dispatch(deletePregunta(p.id));
                    }}>
                    ELIMINAR
                  </button>
                  <div className={s.usuario}> {p.user[0]}</div>
                  <div>➠ </div>
                  <div className={s.usuario}> {p.profesional[0]}</div>
              <button className={s.btnOmitir}
                onClick={(e) => {
                  dispatch(ignorarReportarPregunta(p.id));
                }}>
                OMITIR
              </button>
              </div>
                  <Link to={`/trabajo/${p.PublicacionId}`} className={s.link}>
                    <div className={s.mensaje}>"{p.pregunta}"</div>
                  </Link>
            </div>
          ))
        : null}
    </div>
  );
}
