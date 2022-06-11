import React from "react";
import {useDispatch} from "react-redux";
import { baneoUser} from "../../Redux/actions";
import s from './Config.module.css';

export default function Activos({activos}){

    const dispatch = useDispatch();

    //EVENTOS

  const estado = true;
  const hadleBaneo = (id) => {
    dispatch(baneoUser(id, estado));
  };

    return(
            <div className={s.gridCol}>
                <div className={s.gridItem}>
                    <div>ID</div>
                    <div>MAIL</div>
                    <div>TELEFONO</div>
                </div>
                {activos? activos.map(a=>
                <div className={s.gridItem} key={a.id}>
                  <div className={s.btn} onClick={() => hadleBaneo(a.id)}>suspender</div>
                    <div className={s.gridDivs}>{a.id}</div>
                    <div className={s.gridDivs}>{a.email}</div>
                    <div className={s.gridDivs}>{a.telefono}</div>
                </div>)
                :<div>no hay usuarios activos</div>}
            </div>
    )
}