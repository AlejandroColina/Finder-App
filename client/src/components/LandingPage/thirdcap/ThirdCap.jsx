import React, { useState } from "react";
import s from './ThirdCap.module.css';
import Cards from './../../Home/Cards/cards';
import { useSelector } from 'react-redux';
// import { getUsers } from "../../Redux/actions";
// import { useDispatch } from 'react-redux';

export default function ThirdCap() {


    const { users } = useSelector(state => state);
    const [actual, setActual] = useState(0);

    let handleNext = () => {
        setActual(actual + 1)
    }
    let handlePrev = () => {
        setActual(actual - 1)
    }

    return (
        <div className={s.container}>
            <div className={s.r}>

                <div className={s.r1}>
                    <h1>Mensaje Cualquiera...Mensaje Cualquiera...Mensaje Cualquiera...
                        Mensaje Cualquiera...Mensaje Cualquiera...Mensaje Cualquiera...
                    </h1>
                </div>
                <div className={s.rb1}>
                    <button disabled={actual === 0 ? true : false} onClick={handlePrev}>{'<'}</button>
                </div>
                <div className={s.r2}>
                    <Cards
                        key={users[actual]?.id}
                        promedio={users[actual]?.promedio}
                        logoProfesion={users[actual]?.logoProfesion}
                        nombres={users[actual]?.nombres}
                        imagen={users[actual]?.imagen}
                        descripcion={''}
                        Profesions={users[actual]?.profesion}
                        id={users[actual]?.id}
                    />
                </div>
                <div className={s.rb2}>
                    <button disabled={actual === users.length - 1 ? true : false} onClick={handleNext}>{'>'}</button>
                </div>
            </div>
        </div>
    )
}