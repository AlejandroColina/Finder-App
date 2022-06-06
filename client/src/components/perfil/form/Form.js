import React from "react";
import s from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {cambiarInfo} from '../../Redux/actions/index'
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Form = () => {
  const Perfil = useSelector((state) => state.perfil);
  const { user } = useAuth0();
 const dispatch = useDispatch();
  const [ input, setInput ] = useState({
    nombre: '',
    apellido: "",
    telefono: "",
    documento: "",
  });
 
  console.log(input)


  const handleOnchange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value,
    });
  };

  const handleOnclick = (e) =>{ 
    dispatch(cambiarInfo(user?.email, input))
  }

  return (
    <div className={s.form}>
      <div>
        <h1 className={s.h1}>Completar perfil</h1>
        <div className={s.div}>
          <input
            name="nombre"
           value={input.nombre}
            className={s.input}
            type="text"
            placeholder="name"
            onChange={(e) =>handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
           name='apellido' 
           value={input.apellido}
            className={s.input}
            type="text"
            placeholder="apellido"
            onChange={(e) =>handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
            name="documento" 
            value={input.documento}
            className={s.input}
            type="text"
            placeholder="documento"
            onChange={(e) =>handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div}>
          <input
            name="telefono"
            value={input.telefono}
            className={s.input}
            type="text"
            placeholder="telefono"
            onChange={(e) =>handleOnchange(e)}
          ></input>
        </div>
        <div className={s.div_boton}>
          <button >Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
