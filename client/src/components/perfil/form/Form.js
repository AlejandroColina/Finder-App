import React from "react";
import s from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cambiarInfo, ValidarInfo, getPefil } from "../../Redux/actions/index";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Validate from './Validate'
import Swal from "sweetalert2";
import { TextField } from '@material-ui/core'




const Form = ({abrirCerrarModal}) => {
  const { user } = useAuth0();
 const [disibled, setDisabled] = useState(true)
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    documento: "",
    edad: "",
  });

  const { validar } = useSelector((state) => state);

  const handleOnchange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      Validate(input)
    )
  };

  const validateInput = (form, error) => {
    return (
      form.nombres &&
      form.apellidos&&
      form.telefono &&
      form.documento &&
      form.edad  &&
     !Object.values(error).length
    );
  };
  useEffect(() => {
   setDisabled(!validateInput(input, error))
  }, [input, error]);

  const handleOnClick = () => {
    dispatch(cambiarInfo(user?.email, input));
    setTimeout(() => {
      dispatch(ValidarInfo(user?.email));  
      dispatch(getPefil(user?.email));
      abrirCerrarModal()
      Swal.fire('Listo!', 'Ahora podes crear publicaciones!', 'success')
    }, 1000);
  };

  return (
    <div className={s.form}>
      <div className={s.container}>
        {validar ? (
          <h1 className={s.h1}>Completar perfil</h1>
        ) : (
          <h1 className={s.h1}>Editar perfil</h1>
        )}
        <div className={s.formulario}> 
        <div className={s.div}>
          <TextField 
            value={input.nombres}
            className={s.input}
            type="text"
            placeholder="name"
            name="nombres"
            onChange={(e) => handleOnchange(e)}
            variant="outlined"
            label="nombre"
           
            
          />
           
        </div>
        <p className={s.p}>{error?.nombres}</p> 
       
        <div className={s.div}>
          < TextField 
            name="apellidos"
            value={input.apellidos}
            className={s.input}
            type="text"
            placeholder="apellidos"
            onChange={(e) => handleOnchange(e)}
            variant="outlined"
            label="Apellido"
          />
           
        </div>
        <p className={s.p}>{error?.apellidos}</p> 
        <div className={s.div}>
          < TextField 
            name="documento"
            value={input.documento}
            className={s.input}
            type="number"
            placeholder="documento"
            onChange={(e) => handleOnchange(e)}
            variant="outlined"
            label="documento"
          />
           
        </div>
        <p className={s.p}>{error?.documento}</p> 
        <div className={s.div}>
          < TextField 
            name="telefono"
            value={input.telefono}
            className={s.input}
            type="number"
            placeholder="telefono"
            onChange={(e) => handleOnchange(e)}
            variant="outlined"
            label="Telefono"
          />
           
        </div>
        <p className={s.p}>{error?.telefono}</p> 
        <div className={s.div}>
          < TextField 
            name={"edad"}
            value={input.edad}
            className={s.input}
            type="number"
            placeholder="coloca tu edad"
            onChange={(e) => handleOnchange(e)}
            variant="outlined"
            label="Edad"
          />
          
        </div>
        <p className={s.p}>{error?.edad}</p> 
        </div>
        <div className={s.div_boton}>
          <button className={s.formBoton} onClick={handleOnClick} disabled={disibled}>Guardar</button>
          <button className={s.formBoton} onClick={() => abrirCerrarModal()}>cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
