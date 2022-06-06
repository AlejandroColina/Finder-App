import React, { useEffect, useState } from "react";
import "./UserCreate.css";
import pic from "./img_fast.png";
import user from "./user.png";
import banner from "./banner.png";
import loader from "./1495.gif";
import axios from "axios";
import "./UserCreate.css";
import { getEmpleosForm } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

//Componente Principal

export default function UserCreate() {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState("");

  //Validaciónes
  let validation = () => {
    let error = {};
    if (!input.nombres) {
      error.nombres = "Campo Requerido";
    } else if (!input.apellidos) {
      error.apellidos = "Campo Requerido";
    } else if (!input.edad) {
      error.edad = "Campo Requerido";
    } else if (!input.email) {
      error.email = "Campo Requerido";
    } else if (!input.documento) {
      error.documento = "Campo Requerido";
    } else if (!input.genero) {
      error.genero = "Campo Requerido";
    } else if (!input.telefono) {
      error.telefono = "Campo Requerido";
    } else if (!input.direccion) {
      error.direccion = "Campo Requerido";
    } else if (!input.descripcion) {
      error.descripcion = "Campo Requerido";
    } else if (!input.imagen) {
      error.imagen = "Campo Requerido";
    }
    return error;
  };

  // useState de los inputs
  const [input, setInput] = useState({
    nombres: "",
    apellidos: "",
    edad: "",
    email: "",
    documento: "",
    genero: "",
    telefono: "",
    direccion: "",
    descripcion: "",
    imagen: "",
    puntuacion: [],
  });

  console.log(input);

  // Envío de datos a la DB
  function handleSubmit(e) {
    e.preventDefault();
    let profesionId = Object.keys(empleosSelected);
    axios
      .post("http://localhost:3001/users/crear", { input, selected })
      .then((res) => {
        console.log(res);
        setSuccess(true);
        // alert("Usuario creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el usuario");
      });
  }
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setError(validation({ ...input, [e.target.name]: e.target.value }));
    setInput({
      ...input,
      [name]:
        name === "edad" || name === "documento" || name === "telefono"
          ? !isNaN(parseInt(value))
            ? parseInt(value)
            : (value = "")
          : value,
    });
  };

  //Traer Profresiones
  const empleos = useSelector((state) => state.empleosForm);
  const [empleosSelected, setEmpleosSelected] = useState({});

  const selectChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setEmpleosSelected({ ...empleosSelected, [id]: value });
  };

  useEffect(() => {
    dispatch(getEmpleosForm());
  }, [dispatch]);

  const handleChange1 = (e) => {
    setSelected(e.target.value);
  };

  //Cloudinary
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/userfiles/image/upload/",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setInput({ ...input, imagen: file.secure_url });
    setLoading(false);
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Registrado Correctamente</h1>
          <br />
          <p>
            <a href="#"> Ir al Inicio</a>
          </p>
        </section>
      ) : (
        <>
          <div className="page">
            <div className="formCont">
              <form onSubmit={handleSubmit}>
                {/* Imagen */}

                {loading ? (
                  <img className="loader" src={loader} alt="" />
                ) : !image ? (
                  <img className="userPic" src={user} alt="File Not Found" />
                ) : (
                  <img className="userPic" src={image} alt="File Not Found" />
                )}

                <div className="file-select">
                  <input
                    onChange={uploadImage}
                    name="file"
                    type="file"
                    placeholder="Cargar Imagen"
                  />
                </div>

                {/* Nombre */}

                <input
                  className="inputs"
                  placeholder="Nombres"
                  id="nombres"
                  name="nombres"
                  type="text"
                  onChange={handleChange}
                  value={input.nombres}
                  required
                />

                {/* Apellido */}

                <input
                  className="inputs"
                  placeholder="Apellidos"
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  onChange={handleChange}
                  value={input.apellidos}
                  required
                />

                {/* Edad */}

                <input
                  className="inputs"
                  id="edad"
                  placeholder="Edad"
                  name="edad"
                  type="number"
                  onChange={handleChange}
                  value={input.edad}
                  required
                />

                {/* Email */}

                <input
                  className="inputs"
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={input.email}
                  required
                />

                {/* Documento */}

                <input
                  className="inputs"
                  id="documento"
                  placeholder="Documento"
                  name="documento"
                  type="number"
                  onChange={handleChange}
                  value={input.documento}
                  required
                />

                {/* Género */}

                <input
                  className="inputs"
                  id="genero"
                  placeholder="Genero"
                  name="genero"
                  type="text"
                  onChange={handleChange}
                  value={input.genero}
                  required
                />

                {/* Teléfono */}

                <input
                  className="inputs"
                  id="telefono"
                  placeholder="Telefono"
                  name="telefono"
                  type="number"
                  onChange={handleChange}
                  value={input.telefono}
                  required
                />

                {/* Dirección */}

                <input
                  className="inputs"
                  id="direccion"
                  placeholder="Direccion"
                  name="direccion"
                  type="text"
                  onChange={handleChange}
                  value={input.direccion}
                  required
                />

                {/* Descripcion */}

                <textarea
                  className="inputs"
                  rows="3"
                  id="descripcion"
                  placeholder="Descripcion"
                  name="descripcion"
                  type="textarea"
                  onChange={handleChange}
                  value={input.descripcion}
                  required
                />

                {/* Profesion */}
                <div className="cajaSelect">
                  <label htmlFor="profesion">
                    <select value={selected} onChange={handleChange1}>
                      {empleos &&
                        empleos.map((el, id) => (
                          <option name="empleo" value={id + 1}>
                            {el.nombre}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>

                {/* Subbmit */}
                <button className="submit" type="submit">
                  Registrarse!
                </button>
              </form>
              {/* <img className="banner" src={banner} alt="" /> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
