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
        <div className={s.container}>
        <div className={s.containerDash}>
            <div className={s.importantText} >total de usuarios por categoria</div>
            {totalByTypes.map((t,i)=>{
                return <span  className={s.text} key={i}>{t[0]} : {t[1]}</span>
            })}
        </div>
        </div>
    )
}