import React, { useState } from "react";
import { getCiudades, getEmpleos, rederCard } from "../Redux/actions/index";
import { useEffect } from "react";
import Cards from "./Cards/cards";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { Filtros } from "./Filtros/Filtros";
import Paginado from '../Paginado/Paginado'
import Help from "../Help/Help";
import Destacados from "./Destacados/Destacados";
import Footer from './../Footer/Footer';



function Home() {

  const EMPTY_FILTERS={
    
    profesion: '',
    nombres: '',
    promedio: '',
    genero: '',
    edad: '',
    ciudad: '',
    empleo: ''

  }



  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const [descripcion, setDescripcion] = useState('')


  const trabajadores = useSelector((state) => state.trabajadores);

  const handleFilterChanges = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  };
  const dispatch = useDispatch();

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

  let { genero, promedio, ciudad, profesion } = filters
  useEffect(() => {
    dispatch(rederCard(profesion, genero, promedio, ciudad, descripcion));
    setCurrentPage(1)
  }, [dispatch, profesion, genero, promedio, ciudad, descripcion]);

  let destacados = trabajadores?.filter(el => el.promedio >= 4);

  const resetValues = () => {
    setFilters(EMPTY_FILTERS)
    setDescripcion('')
  }

  return (

    <div>
      <SearchBar descripcion={descripcion} setDescripcion={setDescripcion} />

      <div className={styles.contenidos}>
        <section className={styles.filtros}>
          <Filtros  resetValues={resetValues} filters={filters} handleFilterChanges={handleFilterChanges} />
        </section>
        {/* <section className={styles.posteos}></section> */}

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
          {currentUsuarios?.map((el) => (
            <div className="box">

              <Cards
                key={el.id}
                promedio={el.promedio}
                nombres={el.nombres}
                imagen={el.imagen ? el.imagen : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgemhlS2C1Ldo2xTSqZVm5aAXUGT3DaaJZVRLgof7-GCoq7n0YnVnC7zkRHkpdQr4j4Zk&usqp=CAU'}
                descripcion={el.descripcion}
                Profesions={el.Profesions.length ? el.Profesions : 'nada'}
                id={el.id}
              />
            </div>
          ))}
        </section>
        {/* <section className={styles.publicar}>Anunciarse/Publicar</section> */}
        <section className={styles.destacados}>
          <div className={styles.textDestacados} ><h1>Destacados 🔥</h1></div>
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
  );

}

export default Home;
