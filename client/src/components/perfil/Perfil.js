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
import MisChats from "./ChatPerfil"
import {
  getPefil,
  ValidarInfo,
  getFavoritos,
  getBaneo,
} from "../Redux/actions/index";
import { Link } from "react-router-dom";
import Favorito from "./favoritos/Favoritos";
import { Helmet } from "react-helmet"
import png from './assets/Mask group.png';
import publicidad from "./assets/publicidad.gif";
import bane from './assets/baneado.jpeg'
import {Modal, } from '@material-ui/core'


const Perfil = () => {
 
  const [modal, setModal] = useState(false)

  const abrirCerrarModal = () =>{
    setModal(!modal)
  }


  const body=(
    <div className={s.modal}>
    <Form abrirCerrarModal={abrirCerrarModal}/>
    </div>
  )
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [ MiChat, setMiChat] = useState(false);
  const { validar } = useSelector((state) => state);
  const [favorito, setFavorito] = useState(false);
  const StatePerfil = useSelector((state) => state.perfil);
  const baneo = useSelector((state) => state.baneado);
  const [editar, setEditar] = useState(false);


  const handleVolver = () => {
    setFavorito(false);
    setEditar(false)
    setMiChat(false)
  };
  const handleEditar = () => {
    setEditar(true)
    setFavorito(false)
    setMiChat(false)
  }

  const handleChat = () => {
<<<<<<< HEAD
    setMiChat(true)
    
=======
    setMiChat(true);
>>>>>>> ed051692528d4a46bc199280d9ad47eafd104b6f
    setFavorito(false);
    setEditar(false)
  }

  useEffect(() => {
    dispatch(getPefil(user?.email));
    dispatch(ValidarInfo(user?.email));
    dispatch(getFavoritos(user?.email));
    dispatch(getBaneo(user?.email));
  }, [dispatch, user?.email]);

  const handleState = () => {
    setFavorito(true);
    setEditar(false)
    setMiChat(false)
  };
  return (
    <>
      {!baneo ?
        <div>
          {!StatePerfil ? (
            <Helmet>
              <title>Cargando..</title>
            </Helmet>
          ) : (
            <Helmet>
              <title>{`${StatePerfil[0]?.nombres}`} - Perfil</title>
            </Helmet>
          )}

          <Modal open={modal}
          onClose={abrirCerrarModal}>
            {body}

          </Modal>

          <nav className={s.nav}>
            <Link to="/home">
              <img className={s.logo} src={logo} alt="finder" />
            </Link>{" "}
          </nav>
          <div className={s.portada}>
            <img className={s.img} src={publicidad} alt="portada" />
          </div>
          <section className={s.perfil}>
            <div className={s.nombre}>
              <img className={s.imgper} src={user?.picture} alt="perfil" />
              <div>
                <h2>PERFIL</h2>
                <h1>{StatePerfil[0]?.nombres}</h1>
              </div>
            </div>
            <div className={s.mover}>
              <button className={s.botones} onClick={handleChat} >Mis Chats</button>
              <button className={s.botones} onClick={handleState}>
                Favoritos
              </button>
              {validar?
              <button className={s.botones} onClick={()=>abrirCerrarModal()}>
                Completar perfil
              </button>
              :<></>}
              <button className={s.botones} onClick={handleVolver}>
                perfil
              </button>
            </div>
          </section>

          <section className={s.conten}>
            <div className={s.datos}>
              <Link to="/userLog">
                {" "}
                <button className={s.boton} disabled={validar}>
                  Crear publicacion
                </button>
              </Link>
              {validar ? (
                <p className={s.rojo}>
                  {" "}
                  complete su perfil para poder hacer una publicacion
                </p>
              ) : (
                ""
              )}
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
                <h2>{StatePerfil[0]?.edad}</h2>
              </div>
              {!validar ?
              <button className={s.editar} onClick={handleEditar}>Editar perfil</button>
             : <></>}
            </div>
            <div className={s.publi}>
              {MiChat ? <MisChats/> : <>   
              {editar ? <Form/>
                : <>
              {favorito ? (
                <Favorito />
              ) : (
                <div>
                   <h2 className={s.h2}>Publicaciones</h2>
                      <div className={s.centrar_publi}>
                        {StatePerfil && StatePerfil[0]?.Publicacions.length ?
                          StatePerfil[0].Publicacions.map((el) => (
                            <Card_perfil
                              key={el.id}
                              precio={el.precio}
                              descripcion={el.descripcion}
                              nombre={StatePerfil[0]?.nombres}
                              imagen={StatePerfil[0]?.imagen}
                              Profesions={el.Profesion.nombre}
                              id={el.id}
                              logoProfesion={el.Profesion.logo}
                            />
                          ))
                         : <div><img className={s.nologo} src={png} alt='logo'/>
                           <h1 className={s.h1}>no tiene publicaciones </h1>
                         </div>
                           
                          
                        }
                      </div>
                   
                </div>
              )}
              
              </>}
              </>}
            </div>
            
          </section>
          <footer className={s.footer}>
            <Footer />
          </footer>
        </div> : <div className={s.baneo}><img src={bane} alt="baneado" /></div>}
    </>
  );
};

export default Perfil;
