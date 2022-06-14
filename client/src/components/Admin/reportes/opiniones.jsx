import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteOpinion, ignorarReportarComentario } from "../../Redux/actions";
import s from './styles.module.css';
import {Link} from 'react-router-dom';
import Rating from "@mui/material/Rating";

export default function Opiniones(){
    const dispatch = useDispatch();
    const opiniones = useSelector((state) => state.opinionesReportadas);
    
    return(
      <div className={s.gridCol}>
      <div className={s.sub}>RESEÑAS</div>
        {opiniones
          ? opiniones.map((o) => (
                <div className={s.column} key={o.id}>
                  <div className={s.gridItem}>
                    <button className={s.btnDelete}
                     onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteOpinion(o.id));
                      }}>
                      ELIMINAR
                    </button>
                <Rating size="small" value={o.puntaje} readOnly />
                  <div>➠ </div>
                    <div className={s.usuario}>{o.profesional[0]}</div>
                <button className={s.btnOmitir}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(ignorarReportarComentario(o.id));
                  }}>
                  OMITIR
                </button>
                </div>
                    <Link to={`/trabajo/${o.PublicacionId}`} className={s.link}>
                      <div className={s.mensaje}>"{o.comentario}"</div>
                    </Link>
              </div>
            ))
          : null}
      </div>
    )
}