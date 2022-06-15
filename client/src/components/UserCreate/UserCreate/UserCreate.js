import React, { useEffect, useState } from "react";
import axios from "axios";
import { getEmpleosForm, getCiudades, sendEmailNewPost } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './UserCreate.module.css';
import validate from './validate';
import Swal from "sweetalert2";
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import Error from '../../Error/index';

export default function UserCreate() {
  const {isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmpleosForm());
    dispatch(getCiudades());
  }, [dispatch]);

  const [image, setImage] = useState([]);
  const [selected, setSelected] = useState('');
  const [city, setCity] = useState(0);
  const [formatoImg, setFormatoImg] = useState(false)
  const empleos = useSelector((state) => state.empleosForm);
  const ciudades = useSelector(state => state.ciudades);
  const [input, setInput] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    multimedia: [],
  });
  const [errors, setError] = useState({
    descripcion: ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput((prevState) => {
      let newState = {
        ...prevState,
        [name]: name === 'precio'
          ? !isNaN(parseInt(value)) ? parseInt(value) : value = ''
          : value
      }
      setError(validate(newState));
      return newState;
    });
  };

  const handleChange1 = (e) => { setSelected(e.target.value) }
  const handleChange2 = (e) => { setCity(e.target.value) }
  const handleSend = () => {
    setTimeout(() => {
      dispatch(sendEmailNewPost(user?.email))
    }, 1000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      titulo: "",
      descripcion: "",
      precio: "",
      multimedia: []
    })
    setSelected('')
    setImage([])
    setCity(0)
    setError({})

    if (!Object.values(errors).length) {
      axios.post("http://localhost:3001/users/crear", { toSend })
        .then(() => {
          Swal.fire("Perfecto!",
            'Ya puedes ver tu publicación en nuestra app. Para más acciones búscala en tu perfil',
            'success');
        })
        .catch((error) => {
          Swal.fire("No se pudo crear la publicación",
            'Hubo un problema al publicar tu solicitud. Por favor contacta a administración',
            'error');
          console.log(error);
        });
    }

  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset");
    let formatos = ['jpeg', 'jpg', 'png', 'gif'];

    if (formatos.includes(files[0].type.split('/')[1])) {
      setFormatoImg(false)
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/userfiles/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImage(() => {
        if (file.secure_url.length) return [...image, file.secure_url]
        return image
      });
    } else {
      setFormatoImg(true)
    }
  };

  const delImgSelection = (urlImg) => {
    setImage(image.filter(url => url !== urlImg))
  };

  let toSend = {
    titulo: input.titulo,
    descripcion: input.descripcion,
    ProfesionId: selected,
    precio: input.precio,
    multimedia: image,
    email: user?.email,
    ciudad: city,
  }

  return (<>
    {isAuthenticated? <>
  <NavBar/>
    <section className={styles.container}>
      <div className={styles.div_form} >

        <div className={styles.div1_form}>
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
            <h1 className={styles.log4}> Crea tu publicación</h1>

            <label htmlFor="titulo"></label>
            <input
              className={errors?.titulo ? styles.inputs_fail : styles.inputs}
              id="titulo"
              placeholder="Un título para la publicación..."
              name="titulo"
              type="text"
              onChange={handleChange}
              value={input.titulo}
            />
            <p >{errors?.titulo}</p>

            <label htmlFor="descripcion"></label>
            <textarea
              className={errors?.descripcion?.length ? styles.textarea_fail : styles.textarea}
              id="descripcion"
              placeholder="Descripcion..."
              name="descripcion"
              type="textarea"
              onChange={handleChange}
              value={input.descripcion}
            />
            <p>{errors?.descripcion}</p>

            <label htmlFor="Precio"></label>
            <input
              className={errors?.precio ? styles.inputs_fail : styles.inputs}
              id="precio"
              placeholder="Precio solicitado para el servicio..."
              name="precio"
              type="number"
              onChange={handleChange}
              value={input.precio}
            />
            <p >{errors?.precio}</p>

            <div className={styles.div_select}>
              <select className={styles.selects} value={city} onChange={handleChange2}>
                    <option value=''>Ciudad</option>

                {ciudades &&
                  ciudades.map((el, index) => (
                    <option key={index + 'DIR'}
                      value={index + 1}
                    >
                      {el}
                    </option>
                  ))}
              </select>

              <div>
                <div>
                  <select className={styles.selects} value={selected} onChange=
                    {handleChange1}>
                    <option value=''>Sector</option>
                    {empleos &&
                      empleos.map((el, id) => (
                        <option key={id + 'DR'}
                          value={id + 1}
                        >
                          {el.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.file_select}>
              <input
                disabled={
                  !toSend.ProfesionId ||
                  !toSend.ciudad ||
                  Object.keys(errors).length
                }
                className={styles.btn_file}
                onChange={uploadImage}
                name="file"
                type="file"
                placeholder="Cargar Imagen"
              />
            </div>
            <p>{formatoImg ? 'Formato inválido' : ''}</p>

            <button
              className={
                formatoImg ||
                  !toSend.ProfesionId ||
                  !toSend.ciudad ||
                  Object.keys(errors).length
                  ? styles.btn_fail
                  : styles.btn
              }
              type="submit"
              onClick={handleSend}
              disabled={
                formatoImg ||
                !toSend.ProfesionId ||
                !toSend.ciudad ||
                Object.values(errors).length
              }
            >
              Crear publicación
            </button>
          </div>
        </form>
      <div className={styles.div2_form}>
        {
          image && image.map((url, id) => {
            return (
              <div key={`as${id}`} className={styles.divImg}>
                <button onClick={() => delImgSelection(url)} className={styles.Ximg}>X</button>
                <img className={styles.fotoForm} src={url} alt={`foto ${id}`} />
              </div>
            )
          })
        }
      </div>
      </div >
      <Footer/>
    </section >
    </> : <Error/>}</>
  );
}