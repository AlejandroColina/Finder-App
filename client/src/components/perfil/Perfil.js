import React from "react";
import s from "./Perfil.module.css";
import img from "./assets/images.jpg";
import logo from "./assets/logo_finder_white.png";
import person from "./data";
import Card_perfil from "./Card_perfil/Card_perfil";
import Form from "./form/Form";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPefil, ValidarInfo } from "../Redux/actions/index";

const Perfil = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  
  const { validar } = useSelector(state => state);
  const [perfil, setPerfil] = useState(false);
  const StatePerfil = useSelector((state) => state.perfil);
  
  const handlePerfil = () => {
    setPerfil(true);
  };
  
  const handleVolver = () => {
    setPerfil(false);
  };
  
  useEffect(() => {
    dispatch(getPefil(user?.email));
    dispatch(ValidarInfo(user?.email));
  }, [dispatch, user?.email]);
  
  return (
    <div>
      <nav className={s.nav}>
        <img className={s.logo} src={logo} alt="finder" />
      </nav>
      <div className={s.portada}>
        <img
          className={s.img}
          src={"https://static-cse.canva.com/blob/706582/1600w-dzsSYIjyvws.jpg"}
          alt="portada"
        />
      </div>
      <section className={s.perfil}>
        <div className={s.con_per}>
          <img className={s.imgper} src={person[0].imagen} alt="perfil" />
          <div className={s.nombre}>
            <h2>PERFIL</h2>
            <h1>{StatePerfil[0]?.nombres}</h1>
            <div className={s.flex}>
              <button onClick={handlePerfil}>Completar perfil</button>
            </div>
            <button onClick={handleVolver} className={s.boton}>
              volver
            </button>
          </div>
        </div>
      </section>

      <section className={s.conten}>
        <div className={s.datos}>
          <button className={s.end} disabled={validar}>Crear publicacion</button>
          {!validar ? <p className={s.rojo}> complete su perfil para poder hacer una apublicacion</p> : ''}
          <h1 className={s.personal}>informacion personal</h1>
          <div className={s.info}>
            <h2>nombre completo :</h2>
            <h2>{StatePerfil[0]?.nombres}</h2>
            <h2>apellido :</h2>
            <h2>{StatePerfil[0]?.apellidos}</h2>

            <h2>telefono :</h2>
            <h2>{StatePerfil[0]?.telefono}</h2>
            <h2>email :</h2>
            <h2>{StatePerfil[0]?.email}</h2>
            <h2>edad :</h2>
            <h2>{StatePerfil[0]?.edad ? StatePerfil[0]?.edad : "20"}</h2>
          </div>
        </div>
        <div className={s.publi}>
          {perfil ? (
            <Form />
          ) : (
            <div>
              <h2 className={s.h2}>Publicaciones</h2>
              <div className={s.centrar_publi}>
                {StatePerfil && StatePerfil[0]?.publicaciones ? (
                  StatePerfil[0].publicaciones.map((el) => (
                    <Card_perfil
                      key={el.id}
                      precio={el.precio}
                      descripcion={el.descripcion}
                      nombre={StatePerfil[0]?.nombres}
                      imagen={StatePerfil[0]?.imagen}
                      Profesions={StatePerfil[0]?.Profesions}
                      id={el.id}
                      logoProfesion={StatePerfil[0]?.logoProfesion}
                    />
                  ))
                ) : (
                  <p>NO TIENE</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <footer className={s.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Perfil;
