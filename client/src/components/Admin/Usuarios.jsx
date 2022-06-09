import React, { useEffect } from "react";
import s from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from "../Redux/actions";

export default function Usuarios() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const usuarios = useSelector((state) => state.users)

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        setTimeout(() => {
            dispatch(getUsers())
        }, 200)
    };

    return (
        <div className={s.containerDash} >
            <div className={s.title}> Total de Usuarios: {usuarios.length}</div>{/* 
            <form className={s.row} >
                <input className={s.textarea} type='text' placeholder='Buscar Usuario'/>
                <input className={s.btn}  type='submit' value='buscar'/>
            </form> */}
            <div className={s.containertable} >
                <table className={s.table}>
                    <thead>
                        <tr>
                            <td className={s.tablecol}><strong>USER ID</strong></td>
                            <td className={s.tablecol}><strong>NOMBRE</strong></td>
                            <td className={s.tablecol}><strong>E-MAIL</strong></td>
                            <td className={s.tablecol}><strong>TELEFONO</strong></td>
                            <td className={s.tablecol}><strong>DOCUMENTO</strong></td>
                            <td className={s.tablecol}><strong>DIRECCION</strong></td>
                            <td className={s.tablecol}><strong>CIUDAD</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td className={s.celdas}>{user.id}</td>
                                    <td className={s.celdas}>{user.nombres}</td>
                                    <td className={s.celdas}>{user.email}</td>
                                    <td className={s.celdas}>{user.telefono}</td>
                                    <td className={s.celdas}>{user.documento}</td>
                                    <td className={s.celdas}>{user.direccion}</td>
                                    <td className={s.celdas}>{user.ciudad}</td>
                                    <button onClick={() => handleDelete(user.id)} >🗑</button>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}