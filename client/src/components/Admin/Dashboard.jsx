import React, { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { getTotalUsersBytype } from "../Redux/actions";
import s from './styles.module.css';

export default function Dashboard(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTotalUsersBytype())
    },[dispatch]);
    const totalByTypes = useSelector((state)=>state.usersByType);
    return(
        <div className={s.containerDash}>
            <div className={s.title}>USUARIOS POR CATEGORIA</div>
            <div className={s.Wrap}>
            {totalByTypes.map((t,i)=>{
                return (<div className={s.typeContainer} key={i}>
                    <div className={s.type}>{t[0]}</div>
                    <div className={s.cant}>{t[1]}</div>
                    </div>)
            })}</div>
        </div>
    )
}