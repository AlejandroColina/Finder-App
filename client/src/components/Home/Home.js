import React, { useState } from "react";
import { renderWorkers } from "../Redux/actions/index";
import { useEffect } from "react";

import { useDispatch, useSelector} from "react-redux";
<<<<<<< HEAD
import Cards from '../Cards/cards'
=======
import styles from './styles.module.css';

import { SearchBar } from "./SearchBar/SearchBar";
import { Filtros } from "./Filtros/Filtros";

>>>>>>> b635508c327091ffb38ca3f1227ee7396bac2f36
function Home() {

 
  const [filters, setFilters] = useState({
    job: ''
  })

  const trabajadores = useSelector(state => state.trabajadores)
  
  const dispatch = useDispatch()

  
<<<<<<< HEAD
  // const Usuarios = useSelector(state => state.Usuarios )
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(render());
  // },[]);

  return <div><Cards/></div>;
=======
  useEffect(() => {
    dispatch(renderWorkers())
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
            <section className={styles.cards}>Cards</section>
            <section className={styles.publicar}>Anunciarse/Publicar</section>
            <section className={styles.destacados}>Profesionales destacados</section>
            <section className={styles.footer}>Footer</section>
            </div>
  </div>);

>>>>>>> b635508c327091ffb38ca3f1227ee7396bac2f36

}

export default Home;
