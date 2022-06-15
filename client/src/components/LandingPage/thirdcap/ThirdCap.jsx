import React, { useState } from "react";
import s from './ThirdCap.module.css';
import Cards from './../../Home/Cards/cards';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ThirdCap() {
    const { users, empleosForm } = useSelector(state => state);
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
                <div className={s.s1}>
                    Comunidad FINDER te brinda ofertas
                    profesionales y las
                    mejores experiencias
                </div>
                <div className={s.ss}>
                    <div className={s.r1}>
                        <div className={s.s2}>
                            {
                                empleosForm.map((e, id) => {
                                    return (
                                        <div key={id} className={s.imgs}>
                                            <Link className={s.link} to='/home'>
                                                <img src={e.logo} alt={e.nombre} />
                                                <h3 className={s.prof}>{e?.nombre?.split(' ')[0]}</h3>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={s.rb1}>
                        <button disabled={actual === 0 ? true : false} onClick={handlePrev}>{'<'}</button>
                    </div>
                    <div className={s.r2}>
                        <Cards
                            key={users[actual]?.id}
                            promedio={users[actual]?.promedio}
                            logoProfesion={users[actual]?.publicaciones[0]?.Profesion?.logo}
                            nombres={users[actual]?.nombres}
                            imagen={users[actual]?.imagen}
                            descripcion={' '}
                            Profesions={users[actual]?.publicaciones[0]?.Profesion?.nombre}
                            id={users[actual]?.id}
                            ciudad={users[actual]?.ciudad}
                            precio={users[actual]?.publicaciones[0]?.precio}
                        />
                    </div>
                    <div className={s.rb2}>
                        <button disabled={actual === users.length - 1 ? true : false} onClick={handleNext}>{'>'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}