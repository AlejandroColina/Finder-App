import React from "react";
import BarChart from "./graficos/BarChart";
import CityChart from "./graficos/CityChart";
import s from './styles.module.css';

export default function Dashboard(){
    return(
        <div className={s.containerDash}>
            <div className={s.title}>USUARIOS POR CATEGORIA</div>
            <BarChart/>
            <div className={s.title}>PUBLICACIONES POR UBICACION</div>
            <CityChart/>
        </div>
    )
}