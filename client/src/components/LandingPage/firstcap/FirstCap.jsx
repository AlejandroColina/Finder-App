import React, { useRef, useEffect } from "react";
import s from './FirstCap.module.css';
import { useHistory } from "react-router-dom";
import img_users from './users_logo_landing.png';
import { useDispatch } from 'react-redux';
import { getUsers, rederCard, getEmpleosForm } from "../../Redux/actions";

export default function FirstCap({ descripcion, setDescripcion }) {


    const history = useHistory();
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(rederCard());
        dispatch(getUsers());
        dispatch(getEmpleosForm());
    }, [dispatch])

    const searchRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault(e);
        //dispatch(search(input));
        setDescripcion(searchRef.current.value)
        setTimeout(
            history.push('./home'), 1000
        )
    }

    return (
        <div className={s.container}>
            <div>
                <h2 className={s.title}>GENERA,COMPARA Y CONTRATA</h2>
                <div className={s.text}>Genera empleo contratando EMPRENDEDORES</div>
                <div className={s.text}>Compara precio calidad y cercania</div>
                <div className={s.importantText}>Contrata el mejor servicio ✔</div>
                <form className={s.form} onSubmit={handleSubmit}>
                    <input className={s.input}
                        type='text' placeholder='Que te gustaria contratar?' ref={searchRef}
                    />
                    <input className={s.btn} type='submit' value='⌕' />
                </form>
            </div>
            <img className={s.img} src={img_users} alt='users' />
        </div>
    )
}