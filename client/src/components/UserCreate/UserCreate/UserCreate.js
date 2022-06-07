import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./UserCreate.css";
import pic from "./img_fast.png";
import axios from "axios";
import "./UserCreate.css";
import { getEmpleosForm } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

//Validadores

const validate = (values) => {
  const errors = {};
  if (!values.nombres) {
    errors.nombres = "Campo Requerido";
  } else if (values.nombres.length > 15) {
    errors.nombres = "El máximo permitido es de 15 caractéres";
  }

  if (!values.apellidos) {
    errors.apellidos = "Campo Requerido";
  } else if (values.nombres.length > 15) {
    errors.apellidos = "El máximo permitido es de 20 caractéres";
  }

  if (!values.email) {
    errors.email = "Campo Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Dirección de correo inválida";
  }

  if (!values.documento) {
    errors.documento = "Campo Requerido";
  } else if (values.nombres.length > 10) {
    errors.documento = "El máximo permitido es de 10 caractéres";
  }

  if (!values.descripcion) {
    errors.descripcion = "Campo Requerido";
  }

  if (!values.telefono) {
    errors.telefono = "Campo Requerido";
  }

  if (!values.direccion) {
    errors.direccion = "Campo Requerido";
  }

  if (!values.profesion) {
    errors.profesion = "Campo Requerido";
  }

  return errors;
};

//Componente Principal

export default function UserCreate() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      edad: "",
      descripcion: "",
      direccion: "",
      profesion: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON(values, null, 2));
    },
  });

  //Cloudinary
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/userfiles/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setInput({ ...input, imagen: file.secure_url });
    setLoading(false);
  };

  //Traer Profresiones
  const empleos = useSelector((state) => state.empleosForm);
  const [empleosSelected, setEmpleosSelected] = useState({});

  const selectChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setEmpleosSelected({ ...empleosSelected, [id]: value });
  };

  // Envío de datos a la DB
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/crear", { input, selected, email: user?.email })
      .then((res) => {
        alert("Usuario creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el usuario");
      });
  }

  // useState de los inputs
  const [input, setInput] = useState({
    edad: "",
    descripcion: "",
    direccion: "",
    imagen: ""
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]:
        name === "edad"
          ? !isNaN(parseInt(value))
            ? parseInt(value)
            : (value = "")
          : value,
    });
  };

  useEffect(() => {
    dispatch(getEmpleosForm());
  }, [dispatch]);

  const handleChange1 = (e) => { setSelected(e.target.value) }

  return (
    <>
    <Helmet><title>Nuevo Post - Finder</title></Helmet>
      <div className="formCont">
        <div className="leftCard">
          <img src={pic} alt="" />
        </div>
        {/* 
           onSubmit={formik.handleSubmit}
        */}
        <div className="rightCard">
          <form onSubmit={handleSubmit}>
            <Link to={`/perfil/${user?.email}`} > <button >Perfil</button></Link>
            <Link to='/home' > <button >ir a home</button></Link>
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <img
                className="userPic"
                src={image}
                style={{ width: "300px" }}
                alt="File Not Found"
              />
            )}
            <div className="file-select">
              <input
                onChange={uploadImage}
                name="file"
                type="file"
                placeholder="Cargar Imagen"
              />
            </div>

            <label htmlFor="edad"></label>
            {formik.touched.apellidos && formik.errors.edad ? (
              <div className="required">{formik.errors.edad}</div>
            ) : null}
            <input
              className="inputs"
              id="edad"
              placeholder="Edad"
              name="edad"
              type="number"
              onChange={handleChange}
              value={input.edad}
              onBlur={formik.handleBlur}
            />


            <label htmlFor="descripcion"></label>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className="required">{formik.errors.descripcion}</div>
            ) : null}
            <input
              className="inputs"
              id="descripcion"
              placeholder="descripcion"
              name="descripcion"
              type="textarea"
              onChange={handleChange}
              value={input.descripcion}
              onBlur={formik.handleBlur}
            />


            <label htmlFor="direccion"></label>
            {formik.touched.direccion && formik.errors.direccion ? (
              <div className="required">{formik.errors.direccion}</div>
            ) : null}
            <input
              className="inputs"
              id="direccion"
              placeholder="direccion"
              name="direccion"
              type="text"
              onChange={handleChange}
              value={input.direccion}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="profesion"></label>
            <div>
              <div>
                <select value={selected} onChange={handleChange1}>
                  {empleos &&
                    empleos.map((el, id) => (
                      <option
                        name="empleo"
                        value={id + 1}
                      >
                        {el.nombre}
                      </option>
                    ))}
                </select>
                <label for="empleo">Seleccione profesion</label>
              </div>
            </div>
            <button className="submit" type="submit">
              Registrarse!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// select con  tipos  de profesiones
// con axios llamar a la ruta de empleos
