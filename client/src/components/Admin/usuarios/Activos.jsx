import React,{useState} from "react";
import {useDispatch} from "react-redux";
import { baneoUser, sendBaneo} from "../../Redux/actions";
import s from './Config.module.css';

export default function Activos({activos}){

    const dispatch = useDispatch();

    //EVENTOS

  const estado = true;
  const hadleBaneo = (id) => {
    dispatch(baneoUser(id, estado));
    dispatch(sendBaneo(id));
  };

  //paginado 
  const [page, setPage] = useState(0);
  const currentPage = activos.slice(page, page + 10);

  const handlePrev = (e) => {
    if (page > 0) setPage(page - 10);
  };
  const handleNext = (e) => {
    if (page < activos.length - 10) setPage(page + 10);
  };

  //buscar en activos
  const [input,setInput]= useState('')
  const [buscados,setBuscados]=useState('')


    return(
            <div className={s.gridCol}>
            <div className={s.title}>Activos</div>
            <div className={s.containerBar}>
              {/*PAGINADO */}
              {page > 0 ? (
                <button  className={s.btnPag} onClick={handlePrev}>
                  ANTERIOR
                </button>
              ) : null}
              
              {/*BUSCADOR*/}
            <form className={s.form} onSubmit={()=>{
                  const filtrados = activos.filter(a=>{
                  a.email.toLowerCase().includes(input.toLowerCase())});
                  console.log(filtrados);
                  setBuscados(filtrados);}}>
                <input className={s.input} type='text' value={input} onChange={(e)=>setInput(e.target.value)}/>
                <input className={s.inputBtn} type='submit' value="⌕"/>
            </form>

              {/*PAGINADO */}
              {page < activos.length - 1 ? (
                <button  className={s.btnPag} onClick={handleNext}>
                  SIGUIENTE
                </button>
              ) : null}
            </div>
            
              {/*RENDERIZADO DE BUSCADOS*/}
                {buscados? buscados.map(b=>
                <div className={s.gridItem} key={b.id}>
                    <div className={s.gridDivs}>{b.id}</div>
                    <div className={s.gridDivs}>{b.email}</div>
                    <div className={s.gridDivs}>{b.telefono}</div>
                </div>)

                ://SI NO SE ESTA BUSCANDO NADA SE VA A RENDERIZAR LOS USUARIOS ACTUALES ACTIVOS
                
            <div className={s.subtitle}>usuarios actuales:<strong>{activos.length}</strong></div>}
            
              {/*PRIMER FILA DE TABLA*/}
                <div className={s.gridItem}>
                    <div>ID</div>
                    <div>MAIL</div>
                    <div>TELEFONO</div>
                </div>
              {/*MAPEO DE CADA USUARIO ACTIVO YA PAGINADO */}
                {currentPage? currentPage.map(a=>
                <div className={s.gridItem} key={a.id}>
                  <div className={s.btn} onClick={() => hadleBaneo(a.id)}>SUSPENDER</div>
                    <div className={s.gridDivs}>{a.id}</div>
                    <div className={s.gridDivs}>{a.email}</div>
                    <div className={s.gridDivs}>{a.telefono}</div>
                </div>)
                :<div>no hay usuarios activos</div>}
            </div>
    )
}