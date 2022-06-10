import React from "react";
import s from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";

import { cambiarInfo, ValidarInfo } from '../../Redux/actions/index';
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';


const Form = () => {
  const { user } = useAuth0();
  // const Perfil = useSelector((state) => state.perfil);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombres: user?.name,
    apellidos: user?.lasname,
    telefono: "",
    documento: "",
  });

  const handleOnchange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


  const handleOnClick = () => {
    dispatch(cambiarInfo(user?.email, input))
    setTimeout(() => {
      dispatch(ValidarInfo(user?.email))
    }, 1000)

  }

  return (
    <div className={s.form}>
      <div>
        <h1 className={s.h1}>Completar perfil</h1>
        <div className={s.div}>
          <input
            name="nombres"
            value={input.nombres}
            className={s.input}
            type="text"
            placeholder="name"
            onChange={(e) => handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
            name='apellidos'
            value={input.apellidos}
            className={s.input}
            type="text"
            placeholder="apellidos"
            onChange={(e) => handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
            name="documento"
            value={input.documento}
            className={s.input}
            type="text"
            placeholder="documento"
            onChange={(e) => handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
            name="telefono"
            value={input.telefono}
            className={s.input}
            type="text"
            placeholder="telefono"
            onChange={(e) => handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div_boton}>

          <button onClick={handleOnClick} >Guardar</button>

        </div>
      </div>
    </div>
  );
};

export default Form;
