import React from "react";
import {useDispatch} from "react-redux";
import { deleteUser} from "../../Redux/actions";
import as from './Config.module.css';

export default function DangerZone({users}){

    const dispatch = useDispatch();

    //EVENTOS

    const  handleDelete = (id) =>{
        dispatch(deleteUser(id));
      }

    return(
        <div className={as.ColDanger}>
            <div className={as.gridDan}>
                <div>ID</div>
                <div>MAIL</div>
                <div>TELEFONO</div>
            </div>
            {users? users.map(s=>
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