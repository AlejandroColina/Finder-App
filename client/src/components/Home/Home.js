
import React, { useState } from "react";
import { getCiudades, getEmpleos, rederCard, getNoti,getDestacados } from "../Redux/actions/index";
import { useEffect } from "react";
import Cards from "./Cards/cards";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { Filtros } from "./Filtros/Filtros";
import Paginado from '../Paginado/Paginado'
import Help from "../Help/Help";
import { Helmet } from 'react-helmet';
import Footer from './../Footer/Footer';

import NoResult from './noResult/NoResult'
import Destacados from "./Destacados";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";
import { useAuth0 } from '@auth0/auth0-react';
import HomeLoader from "./loading/Skeleton";



function Home({ descripcion, setDescripcion }) {
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  const EMPTY_FILTERS = {

    profesion: '',
    nombres: '',
    promedio: '',
    genero: '',
    edad: '',
    ciudad: '',
    empleo: '',
    edad: ''
  }
  

  const loanding = useSelector((state) => state.loanding);


  const [filters, setFilters] = useState(EMPTY_FILTERS)

  // const [descripcion, setDescripcion] = useState('')


  const trabajadores = useSelector((state) => state.trabajadores);
  const handleFilterChanges = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPag] = useState(9);
  const indexDelUltimoItem = currentPage * itemsPorPag;
  const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;
  const currentUsuarios = trabajadores.slice(indexDelPrimerItem, indexDelUltimoItem);
  const paginado = (numPage) => {
    setCurrentPage(numPage);
  };

  dispatch(getEmpleos())
  dispatch(getCiudades())

  let { genero, promedio, ciudad, profesion, edad } = filters
  useEffect(() => {
    dispatch(rederCard(profesion, genero, promedio, ciudad, descripcion, edad));
    setCurrentPage(1)

    if(isAuthenticated){
      firebase.auth().signInWithEmailAndPassword(user.email, user.nickname)
    }
  }, [dispatch, profesion, genero, promedio, ciudad, descripcion, edad]);


  useEffect(()=>{
   dispatch(getDestacados())
  },[dispatch]);
const destacados = useSelector((state)=>state.publicacionesDestacadas);
  const resetValues = () => {
    setFilters(EMPTY_FILTERS)
    setDescripcion('')
  }
  //Skeleton
  if (loanding) {
    return (
      <div>
        <Helmet><title>Cargando..</title></Helmet>
        <SearchBar descripcion={descripcion} setDescripcion={setDescripcion} />
        <section className={styles.filtros}>
            <Filtros resetValues={resetValues} filters={filters} handleFilterChanges={handleFilterChanges} />
        </section>
        <div className={styles.loaders}>
        <HomeLoader />
        </div>
      </div>

    )
  }



  return (
    <div>
      <Helmet><title>Home -  Finder</title></Helmet>
      <div>
        <SearchBar descripcion={descripcion} setDescripcion={setDescripcion} />

        <div className={styles.contenidos}>
          <section className={styles.filtros}>
            <Filtros resetValues={resetValues} filters={filters} handleFilterChanges={handleFilterChanges} />
          </section>


          <section className={styles.cards}>

            <div className={styles.paginado}>
              {
                <div >
                  <Paginado

                    personasPerPage={itemsPorPag}
                    allPersonas={trabajadores.length}
                    paginado={paginado}
                  />
                </div>
              }
            </div>
            {currentUsuarios.length ?
              currentUsuarios.map((el) => (
                <div
                  key={el.idPublicacion} className="box">
                  <Cards
                    key={el.idPublicacion}
                    promedio={el.promedio}
                    nombres={el.nombres}
                    ciudad={el.ciudad}
                    precio={el.precio}
                    imagen={el.imagen ? el.imagen : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgemhlS2C1Ldo2xTSqZVm5aAXUGT3DaaJZVRLgof7-GCoq7n0YnVnC7zkRHkpdQr4j4Zk&usqp=CAU'}
                    descripcion={el.descripcion}
                    Profesions={el.Profesions.length ? el.Profesions : 'nada'}
                    logoProfesion={el.logoProfesion}
                    id={el.idPublicacion}
                  />
                </div>
              )) : <NoResult />}
          </section>

          <section className={styles.destacados}>
            <div className={styles.textDestacados} ><h1>DESTACADOS <i style={{ color: 'yellow', marginRight: '2px', textShadow: '3px 4px black' }} class="fa-solid fa-bolt-lightning"></i></h1></div>
            <div className={styles.div__destacados}>
              {
                destacados.map(el => {
                  return (
                    <section key={el.id}>

                      <Destacados
                        key={`${el.id}A`}
                        id={el.id}
                        Profesions={el.Profesions}
                        apellidos={el.apellidos}
                        imagen={el.imagen}
                        logoProfesion={el.logoProfesion}
                        nombres={el.nombres}
                        descripcion={el.descripcion}
                        promedio={el.promedio}
                      />

                    </section>
                  )
                })
              }
            </div>
          </section>
          <section className={styles.footer}>
            <Footer />
          </section>
        </div>
        <Help />
      </div>
    </div>
  );

}

export default Home;