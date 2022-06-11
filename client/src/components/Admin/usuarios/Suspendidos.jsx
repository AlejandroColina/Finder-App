import React from "react";
import {useDispatch} from "react-redux";
import { desbanear} from "../../Redux/actions";
import as from './Config.module.css';

export default function Suspendidos({suspendidos}){

    const dispatch = useDispatch();

    //EVENTOS

    const debanear = false
    const handleDesbanear = (id) => {
      dispatch(desbanear(id, debanear));
    }

    return(
        <div className={as.gridCol}>
            <div className={as.gridItem}>
                <div>ID</div>
                <div>MAIL</div>
                <div>TELEFONO</div>
            </div>
            {suspendidos? suspendidos.map(s=>
            <div className={as.gridItem} key={s.id}>
              <div className={as.btnAc} onClick={() => handleDesbanear(s.id)}>activar</div>
                <div className={as.gridDivs}>{s.id}</div>
                <div className={as.gridDivs}>{s.email}</div>
                <div className={as.gridDivs}>{s.telefono}</div>
            </div>)
            :<div>no hay usuarios suspendidos</div>}
        </div>
    )
}