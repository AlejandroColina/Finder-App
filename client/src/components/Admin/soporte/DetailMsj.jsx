import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendRes } from '../../Redux/actions';
import s from '../styles.module.css';
import Swal from "sweetalert2";

export default function DetatilMsj({setOpen}) {
    const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e);
    }

    const readOne = useSelector((state) => state.msjDetailAdmin);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput('')
        setOpen(false)
        dispatch(SendRes({ message: input }, readOne.email));
        Swal.fire("Mensaje enviado", '', 'success')
    }

    return (
        <div className={s.containerReading}>
            <div className={s.mail} >{readOne.email}</div>
            <p>"{readOne.mensaje}"</p>
            <form key={readOne.id} onSubmit={(e) => handleSubmit(e)}>
                <textarea className={s.textarea} placeholder='Responder...' rows='3' value={input} onChange={(e) => handleChange(e.target.value)} />
                <input className={s.btn} type='submit' value='Send' />
            </form>
        </div>
    )
}