import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, sendEliminado, getUsers } from "../../Redux/actions";
import as from "./Config.module.css";

export default function DangerZone({users}) {
  const dispatch = useDispatch();
  //EVENTOS

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(sendEliminado(id));
   
   setTimeout(() => {
    dispatch(getUsers())
  }, 1000)
  };

      //paginado 
      const [page, setPage] = useState(0);
      const currentPage = users.slice(page, page + 10);
    
      const handlePrev = (e) => {
        if (page > 0) setPage(page - 10);
      };
      const handleNext = (e) => {
        if (page < users.length - 10) setPage(page + 10);
      };

      //buscar en suspendidos
      const [input, setInput] = useState("");
      const [buscados, setBuscados] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const filtrados = users.filter((el) =>
          el.email.toLowerCase().includes(input.toLowerCase())
        );
    
        setBuscados(filtrados);
        
      };
    
    

    return(
        <div className={as.ColDanger}>
        <div className={as.titleDanger}>Danger Zone</div>
{buscados ? (
  buscados.map((b) => (
    <div className={as.gridDan} key={b.id}>
      <div className={as.gridDivs}>{b.id}</div>
      <div className={as.gridDivs}>{b.email}</div>
      <div className={as.gridDivs}>{b.telefono}</div>
    </div>
  ))
) : (

  <div className={as.subtitleDanger}>
    usuarios actuales:<strong>{users.length}</strong>
  </div>
)}

            <div className={as.containerBar}>
              {page > 0 ? (
                <button className={as.btnPag} onClick={handlePrev}>
                  ANTERIOR
                </button>
              ) : null}
            <form  className={as.form} onSubmit={(e) => handleSubmit(e)}>
                <input className={as.input} type='text'
                onChange={(e) => setInput(e.target.value)} />
                <input className={as.inputBtn} type='submit' value="⌕"/>
            </form>
              {page < users.length ? (
                <button className={as.btnPag} onClick={handleNext}>
                  SIGUIENTE
                </button>
              ) : null}
            </div>
            <div className={as.gridDan}>
                <div>ID</div>
                <div>MAIL</div>
                <div>TELEFONO</div>
      </div>
      {currentPage ? (
        currentPage.map((s) => (
          <div className={as.gridDan} key={s.id}>
            <div className={as.btnDan} onClick={() => handleDelete(s.id)}>
              ELIMINAR USUARIO
            </div>
            <div className={as.gridDivs}>{s.id}</div>
            <div className={as.gridDivs}>{s.email}</div>
            <div className={as.gridDivs}>{s.telefono}</div>
          </div>
        ))
      ) : (
        <div>no hay usuarios suspendidos</div>
      )}
    </div>
  );
}
