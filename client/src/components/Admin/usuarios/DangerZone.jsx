import React,{useState} from "react";
import {useDispatch} from "react-redux";
import { deleteUser, sendEliminado} from "../../Redux/actions";
import as from './Config.module.css';

export default function DangerZone({users}){

    const dispatch = useDispatch();

    //EVENTOS

    const  handleDelete = (id) =>{
        dispatch(deleteUser(id));
        dispatch(sendEliminado(id));
      }

      //paginado 
      const [page, setPage] = useState(0);
      const currentPage = users.slice(page, page + 10);
    
      const handlePrev = (e) => {
        if (page > 0) setPage(page - 10);
      };
      const handleNext = (e) => {
        if (page < users.length - 10) setPage(page + 10);
      };
    
    

    return(
        <div className={as.ColDanger}>
        <div className={as.titleDanger}>Danger Zone</div>
        <div className={as.subtitleDanger}>usuarios actuales:<strong>{users.length}</strong></div>
            <div className={as.containerBar}>
              {page > 0 ? (
                <button className={as.btnPag} onClick={handlePrev}>
                  ANTERIOR
                </button>
              ) : null}
            <form  className={as.form}>
                <input className={as.input} type='text' />
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
            {currentPage? currentPage.map(s=>
            <div className={as.gridDan} key={s.id}>
              <div className={as.btnDan} onClick={() => handleDelete(s.id)} >ELIMINAR USUARIO</div>
                <div className={as.gridDivs}>{s.id}</div>
                <div className={as.gridDivs}>{s.email}</div>
                <div className={as.gridDivs}>{s.telefono}</div>
            </div>)
            :<div>no hay usuarios suspendidos</div>}
        </div>
    )
}