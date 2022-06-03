import React, { useEffect } from "react";
import BarChart from "./graficos/BarChart";
import s from './styles.module.css';

export default function Dashboard(){
    return(
        <div className={s.containerDash}>
            <div className={s.title}>USUARIOS POR CATEGORIA</div>
            <BarChart/>
        </div>
    )
}