import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import pic from "./img_fast.png";
import axios from "axios";
import { getEmpleosForm, getCiudades } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './UserCreate.module.css';
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
  const [selected, setSelected] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      precio: "",
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
    setInput({ ...input, multimedia: file.secure_url });
    setLoading(false);
  };

  //Traer Profresiones
  const empleos = useSelector((state) => state.empleosForm);
  const ciudades = useSelector(state => state.ciudades);
  const [empleosSelected, setEmpleosSelected] = useState({});

  const selectChange = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setEmpleosSelected({ ...empleosSelected, [id]: value });
  };

  const [input, setInput] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    multimedia: [],
  });

  let toSend = {
    titulo: input.titulo,
    descripcion: input.descripcion,
    ProfesionId: selected,
    precio: input.precio,
    multimedia: [],
    email: user?.email,
    ciudad: city,
  }

  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      titulo: "",
      descripcion: "",
      precio: "",
      multimedia: [],
    })
    axios
      .post("http://localhost:3001/users/crear", { toSend })
      .then((res) => {
        alert("Usuario creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el usuario");
      });
  }

  // useState de los inputs


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]:
        name === "precio"
          ? !isNaN(parseInt(value))
            ? parseInt(value)
            : (value = "")
          : value,
    });
  };

  useEffect(() => {
    dispatch(getEmpleosForm());
    dispatch(getCiudades());
  }, [dispatch]);

  const handleChange1 = (e) => { setSelected(e.target.value) }
  const handleChange2 = (e) => { setCity(e.target.value) }

  console.log('ELEGIDO: ', toSend)

  return (
    <section className={styles.container}>
      <div className={styles.div_form} >
        <div className={styles.formulario1}>
          <div className={styles.log}></div>
          <div className={styles.log2}>
            <Link to={`/perfil/${user?.email}`} >
              <button className={styles.btn1} >Perfil</button>
            </Link>
            <Link to='/home' >
              <button className={styles.btn1} >ir a home</button>
            </Link>
          </div>
          <div className={styles.log3}>
            Inspírate, piensa ,comparte tus habilidades, sé <b>finder</b>!
          </div>

        </div>
        <form className={styles.formulario} onSubmit={handleSubmit}>


          <div className={styles.formulario2}>

            <div className={styles.file_select}>
              <input
                onChange={uploadImage}
                name="file"
                type="file"
                placeholder="Cargar Imagen"
              />
            </div>

            <label htmlFor="Título de la publicación"></label>
            {formik.touched.apellidos && formik.errors.edad ? (
              <div className={styles.required}>{formik.errors.edad}</div>
            ) : null}
            <input
              className={styles.inputs}
              id="titulo"
              placeholder="Un título para la publicación..."
              name="titulo"
              type="text"
              onChange={handleChange}
              value={input.edad}
              onBlur={formik.handleBlur}
            />


            <label htmlFor="descripcion"></label>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className={styles.required}>{formik.errors.descripcion}</div>
            ) : null}
            <textarea
              className={styles.textarea}
              id="descripcion"
              placeholder="Descripcion..."
              name="descripcion"
              type="textarea"
              onChange={handleChange}
              value={input.descripcion}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="Precio"></label>
            {formik.touched.apellidos && formik.errors.edad ? (
              <div className={styles.required}>{formik.errors.edad}</div>
            ) : null}
            <input
              className={styles.inputs}
              id="precio"
              placeholder="Precio solicitado para el servicio..."
              name="precio"
              type="number"
              onChange={handleChange}
              value={input.edad}
              onBlur={formik.handleBlur}
            />
            {/* <label htmlFor="direccion"></label>
            {formik.touched.direccion && formik.errors.direccion ? (
              <div className={styles.required}>{formik.errors.direccion}</div>
            ) : null}
            <input
              className={styles.inputs}
              id="direccion"
              placeholder="direccion"
              name="direccion"
              type="text"
              onChange={handleChange}
              value={input.direccion}
              onBlur={formik.handleBlur}
            /> */}

            <div className={styles.div_select}>
              <select className={styles.selects} value={city} onChange={handleChange2}>
                {ciudades &&
                  ciudades.map((el, id) => (
                    <option
                      value={el}
                    >
                      {el}
                    </option>
                  ))}
              </select>

              <div>
                <div>
                  <select className={styles.selects} value={selected} onChange={handleChange1}>
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
                </div>
              </div>
            </div>

            <button className={styles.btn} type="submit">
              Crear publicación
            </button>
          </div>
        </form>
      </div>

    </section>
  );
}

// select con  tipos  de profesiones
// con axios llamar a la ruta de empleos
