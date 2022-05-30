import React, { useEffect } from "react";
import s from './ThirdCap.module.css';
import Cards from './../../Home/Cards/cards';
import { useSelector } from 'react-redux';
import { getUsers } from "../../Redux/actions";
import { useDispatch } from 'react-redux';

export default function ThirdCap() {
    let dispatach = useDispatch()
    useEffect(() => {
        dispatach(getUsers())
    }, [dispatach])

    const { users } = useSelector(state => state);
    return (
        <div className={s.container}>
            <div className={s.r}>
                <button >{'<'}</button>
                <Cards
                    key={1}
                    promedio={4}
                    logoProfesion={"https://www3.paho.org/hq/images/stories/2019/midwives-nurses.jpg"}
                    nombres={'Fernando'}
                    imagen={'https://static.abc.es/media/MM/2021/11/10/PaulRudd-k2bE--1296x900@abc.jpg'}
                    descripcion={'Dolorum sed accusamus qui officiis quod nisi.'}
                    Profesions={'Enfermeria'}
                    id={1}
                />
                <Cards
                    key={2}
                    promedio={4}
                    logoProfesion={"https://www.uamerica.edu.co/wp-content/documentos/Ing-Industrial-17102019-1080x675.jpg"}
                    nombres={'Alfonso'}
                    imagen={'https://image.shutterstock.com/image-photo/drummer-playing-drums-smoke-powder-260nw-1040614744.jpg'}
                    descripcion={'Sed officiis quo dolores ut consequuntur temporibus recusandae facere.'}
                    Profesions={'Ingenierias'}
                    id={2}
                />
                <Cards
                    key={3}
                    promedio={5}
                    logoProfesion={"https://bridgecom.co/wp-content/uploads/2017/07/internet.jpg"}
                    nombres={'Alejandra'}
                    imagen={'https://www.trendtic.cl/wp-content/uploads/2021/03/mujer-trabajando.jpg'}
                    descripcion={'Quo quo ut vitae id incidunt.'}
                    Profesions={'Comercial, Ventas y Negocios'}
                    id={3}
                />

                <button>{'>'}</button>
            </div>
        </div>
    )
}