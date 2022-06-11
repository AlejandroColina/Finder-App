import React from "react";
import Activos from './Activos';
import Suspendidos from "./Suspendidos";
import DangerZone from "./DangerZone";
import s from './Config.module.css';

export default function Usuarios({activos,suspendidos,users}){

    return(
        <div className={s.containerDash}>
        <div className={s.gridContainer}>
            {/*usuarios activos */}
            <Activos activos={activos}/>

            {/*usuarios suspendidos */}
            <Suspendidos suspendidos={suspendidos}/>

            <DangerZone users={users}/>

        </div>
        </div>
    )
}