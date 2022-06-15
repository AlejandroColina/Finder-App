import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { desbanear, sendDesBaneo } from "../../Redux/actions";
import as from './Config.module.css';

export default function Suspendidos({ suspendidos }) {

    const dispatch = useDispatch();

    //EVENTOS

    const debanear = false
    const handleDesbanear = (id) => {
        dispatch(desbanear(id, debanear));
        dispatch(sendDesBaneo(id));
    }

    //paginado 
    const [page, setPage] = useState(0);
    const currentPage = suspendidos.slice(page, page + 10);
  
    const handlePrev = (e) => {
      if (page > 0) setPage(page - 10);
    };
    const handleNext = (e) => {
      if (page < suspendidos.length - 10) setPage(page + 10);
    };

    //buscar en suspendidos
    const [input, setInput] = useState("");
    const [buscados, setBuscados] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const filtrados = suspendidos.filter((el) =>
        el.email.toLowerCase().includes(input.toLowerCase())
      );
  
      setBuscados(filtrados);
      
    };
  

    return (
        <div className={as.gridCol}>
        <div className={as.title}>Suspendidos</div>
        {suspendidos && suspendidos.length>10?
        <div className={as.containerBar}>
              {page > 0 ? (
                <button className={as.btnPag} onClick={handlePrev}>
                  ANTERIOR
                </button>
              ) : null}
            <form className={as.form} onSubmit={(e) => handleSubmit(e)}>
                <input className={as.input} type='text'
                onChange={(e) => setInput(e.target.value)} />
                <input className={as.inputBtn} type='submit' value="⌕"/>
            </form>
              {page < suspendidos.length - 1 ? (
                <button className={as.btnPag} onClick={handleNext}>
                  SIGUIENTE
                </button>
              ) : null}
        </div> :null}

{/*RENDERIZADO DE BUSCADOS*/}
{buscados ? (
  buscados.map((b) => (
    <div className={as.gridItem} key={b.id}>
      <div className={as.gridDivs}>{b.id}</div>
      <div className={as.gridDivs}>{b.email}</div>
      <div className={as.gridDivs}>{b.telefono}</div>
    </div>
  ))
) : (

  <div className={as.subtitle}>
    usuarios actuales:<strong>{suspendidos.length}</strong>
  </div>
)}

            <div className={as.gridItem}>
                <div>ID</div>
                <div>MAIL</div>
                <div>TELEFONO</div>
            </div>
            {currentPage ? currentPage.map(s =>
                <div className={as.gridItem} key={s.id}>
                    <div className={as.btnAc} onClick={() => handleDesbanear(s.id)}>ACTIVAR</div>
                    <div className={as.gridDivs}>{s.id}</div>
                    <div className={as.gridDivs}>{s.email}</div>
                    <div className={as.gridDivs}>{s.telefono}</div>
                </div>)
                : <div>no hay usuarios suspendidos</div>}
        </div>
    )
}