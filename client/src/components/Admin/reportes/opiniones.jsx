import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteOpinion, ignorarReportarComentario } from "../../Redux/actions";

export default function Opiniones(){
    const dispatch = useDispatch();
    const opiniones = useSelector((state) => state.opinionesReportadas);
    
    return(
        <div>
        {opiniones
          ? opiniones.map((o) => (
              <div key={o.id}>
                <div>{o.comentario}</div>
                <div>de {o.user}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteOpinion(o.id));
                  }}>
                  ELIMINAR RESEÑA
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(ignorarReportarComentario(o.id));
                  }}>
                  IGNORAR
                </button>

              </div>
            ))
          : null}

        </div>
    )
}