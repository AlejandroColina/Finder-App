import React from "react";
import s from "./Form.module.css";
import { useState } from "react";
const Form = () => {
  const { input, setInput } = useState({
    nombre: "gg",
    apellido: "gg",
    telefono: "g",
    documento: "g",
  });
  const handleOnchange = (e) => {
    setInput({
      ...input,
      [s.target.name]: e.target.value,
    });
  };

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
          <button className={s.button}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
