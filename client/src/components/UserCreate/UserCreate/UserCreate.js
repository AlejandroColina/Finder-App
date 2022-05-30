import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./UserCreate.css";
import pic from "./img_fast.png";
import axios from "axios";
import "./UserCreate.css";
import { getEmpleosForm } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      edad: "",
      email: "",
      documento: "",
      descripcion: "",
      telefono: "",
      direccion: "",
      profesion: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  //Profresiones
  const empleos = useSelector((state) => state.empleosForm);
  const [empleosSelected, setEmpleosSelected] = useState({});
  console.log(empleosSelected);

  const selectChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setEmpleosSelected({ ...empleosSelected, [id]: value });
  };

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
    setLoading(false);
  };

  // Envío de datos a la DB

  function handleSubmit(e) {
    e.preventDefault();
    let profesionId = Object.keys(empleosSelected);
    axios
      .post("http://localhost:3001/persona", { input, profesionId })
      .then((res) => {
        console.log(res);
        alert("Usuario creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el usuario");
      });
  }

  // useState de los inputs
  const [input, setInput] = useState({
    nombres: "",
    apellidos: "",
    edad: "",
    email: "",
    documento: "",
    descripcion: "",
    telefono: "",
    direccion: "",
    genero: "",
  });
  console.log(input);

  useEffect(() => {
    dispatch(getEmpleosForm());
  }, [dispatch]);

  return (
    <>
      <div className="formCont">
        <div className="leftCard">
          <img src={pic} alt="" />
        </div>
        {/* 
           onSubmit={formik.handleSubmit}
        */}
        <div className="rightCard">
          <form onSubmit={handleSubmit}>
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

            <input
              className="registro"
              onChange={uploadImage}
              name="file"
              type="file"
              placeholder="Cargar Imagen"
            />

            <label htmlFor="nombres"></label>
            <input
              id="nombres"
              placeholder="Nombres"
              name="nombres"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombres}
            />
            {formik.touched.nombres && formik.errors.nombres ? (
              <div>{formik.errors.nombres}</div>
            ) : null}

            <label htmlFor="apellidos"></label>
            <input
              id="apellidos"
              placeholder="Apellidos"
              name="apellidos"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apellidos}
            />
            {formik.touched.apellidos && formik.errors.apellidos ? (
              <div>{formik.errors.apellidos}</div>
            ) : null}
            <label htmlFor="email"></label>
            <input
              id="email"
              placeholder="Email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}

            <label htmlFor="documento"></label>
            <input
              id="documento"
              placeholder="documento"
              name="documento"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.documento}
            />
            {formik.touched.documento && formik.errors.documento ? (
              <div>{formik.errors.documento}</div>
            ) : null}

            <label htmlFor="descripcion"></label>
            <input
              id="descripcion"
              placeholder="descripcion"
              name="descripcion"
              type="textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
            />
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div>{formik.errors.descripcion}</div>
            ) : null}

            <label htmlFor="telefono"></label>
            <input
              id="telefono"
              placeholder="telefono"
              name="telefono"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
            />
            {formik.touched.telefono && formik.errors.telefono ? (
              <div>{formik.errors.telefono}</div>
            ) : null}

            <label htmlFor="direccion"></label>
            <input
              id="direccion"
              placeholder="direccion"
              name="direccion"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.direccion}
            />
            {formik.touched.direccion && formik.errors.direccion ? (
              <div>{formik.errors.direccion}</div>
            ) : null}

            <label htmlFor="profesion"></label>
            {/* <select id="profesion" name="profesion">
              {empleos &&
                empleos.map((e) => {
                  <option value={e.nombre} id={e.id}>
                    {e.nombre}
                  </option>;
                })}
            </select> */}
            <div>
              <p>profesion:</p>
              {empleos &&
                empleos.map((el) => (
                  <div>
                    <input
                      type="checkbox"
                      name="empleo"
                      value={el.nombre}
                      id={el.id}
                      onChange={selectChange}
                    />
                    <label for="empleo">{el.nombre}</label>
                  </div>
                ))}
            </div>
            <button type="submit">Registrarse!</button>
          </form>
        </div>
      </div>
    </>
  );
}

// select con  tipos  de profesiones
// con axios llamar a la ruta de empleos
