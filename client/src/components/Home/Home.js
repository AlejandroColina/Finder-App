import React, { useState } from "react";
import {  rederCard } from "../Redux/actions/index";
import { useEffect } from "react";
import Cards from './Cards/cards'
import { useDispatch, useSelector} from "react-redux";


import styles from './styles.module.css';

import { SearchBar } from "./SearchBar/SearchBar";
import { Filtros } from "./Filtros/Filtros";


function Home() {

 
  const [filters, setFilters] = useState({
    job: ''
  })

  const trabajadores = useSelector(state => state.trabajadores)
  
  const dispatch = useDispatch()

  


  useEffect(() => {
    dispatch(rederCard())
  }, [dispatch])
  


  return (
  <div>
            <SearchBar filters={filters} setFilters={setFilters} />

            <div className={styles.contenidos}>
            <section className={styles.filtros}>
              <Filtros />
            </section>
            <section className={styles.posteos}>

            </section>
            <section className={styles.cards}>
              {trabajadores && trabajadores.map(el => <Cards nombres={el.nombres} imagen={el.imagen}  descripcion={el.descripcion}/>)}
            </section>
            <section className={styles.publicar}>Anunciarse/Publicar</section>
            <section className={styles.destacados}>Profesionales destacados</section>
            <section className={styles.footer}>Footer</section>
            </div>
  </div>);



}

export default Home;
