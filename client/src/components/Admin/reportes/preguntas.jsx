import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePregunta, ignorarReportarPregunta } from "../../Redux/actions";

export default function Preguntas() {
  const dispatch = useDispatch();
  const preguntas = useSelector((state) => state.preguntasReportadas);
  return (
    <div>
      {preguntas
        ? preguntas.map((p) => (
            <div key={p.id}>
              <div>{p.pregunta}</div>
              <div>de {p.user}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deletePregunta(p.id));
                }}
              >
                ELIMINAR PREGUNTA
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(ignorarReportarPregunta(p.id));
                }}
              >
                IGNORAR
              </button>
            </div>
          ))
        : null}
    </div>
  );
}
