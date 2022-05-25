import React, { useState } from "react";
import s from './FirstCap.module.css';
import One from '../svg/One';
import { useHistory } from "react-router-dom";
//import {useDispatch} from 'react-redux';

export default function FirstCap(){
    const [input, setInput]=useState('')
    //const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e)=>{
        setInput(e)
    }
    const handleSubmit = (e)=>{
        e.preventDefault(e);
        //dispatch(search(input));
        setTimeout(
            history.push('./home'),1000
        )
    }
    return(
        <div className={s.container}>
            <div>
                <h2>GENERA, COMPARA Y CONTRATA</h2>
                <div>Genera empleo contratando EMPRENDEDORES</div>
                <div>Compara precio calidad y cercania</div>
                <div className={s.importantText}>Contrata el mejor servicio ✔</div>
                <form className={s.form} onSubmit={handleSubmit}>
                    <input className={s.input} 
                    type='text' placeholder='Que te gustaria contratar?'
                     onChange={(e)=>handleChange(e)}/>
                    <input  className={s.btn} type='submit' value='⌕'/>
                </form>
            </div>
            <One  className={s.svgOne}/>
        </div>
    )
}