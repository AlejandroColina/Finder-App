import React from "react";
import s from "./Form.module.css";
const Form = () => {
  return (
    <div className={s.form}>
      <div>
        <div className={s.div}>
          <input className={s.input} type="text" placeholder="name"></input>
        </div>
        <div className={s.div}>
          <input className={s.input} type="text" placeholder="apellido"></input>
        </div>
        <div className={s.div}>
          <input className={s.input} type="text" placeholder="img"></input>
        </div>
        <div className={s.div}>
          <input className={s.input} type="text" placeholder="telefono"></input>
        </div>
        <div className={s.div}>
          <input className={s.input} type="text" placeholder="correo"></input>
        </div>
        <div className={s.div_boton}> 
        <button className={s.button}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
