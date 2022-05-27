import React, { useState } from "react";
import { rederCard } from "../Redux/actions/index";
import { useEffect } from "react";
import Cards from "./Cards/cards";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { Filtros } from "./Filtros/Filtros";
import Paginado from '../Paginado/Paginado'



function Home() {
  const [filters, setFilters] = useState({

    ciudad: '',
    tipo: '',
    rating: undefined
  })


  const trabajadores = useSelector((state) => state.trabajadores);

  const handleFilterChanges = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPorPag] = useState(9);
const indexDelUltimoItem = currentPage * itemsPorPag;
const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;
const currentUsuarios = trabajadores.slice(indexDelPrimerItem, indexDelUltimoItem);
const paginado = (numPage) => {
  setCurrentPage(numPage);
};

  useEffect(() => {
    dispatch(rederCard());
  }, [dispatch]);

  return (

    <div>
      <SearchBar filters={filters} setFilters={setFilters} />

      <div className={styles.contenidos}>
        <section className={styles.filtros}>
          <Filtros />
        </section>
        <section className={styles.posteos}></section>

        <section className={styles.cards}>
        {
           <div >
                <Paginado
                  personasPerPage= {itemsPorPag}
                  allPersonas= {trabajadores.length}
                  paginado= {paginado}
                  />
                  </div> 
}
          {currentUsuarios &&
           currentUsuarios.map((el) => (
              <Cards
                key={el.id}
                promedio={el.promedio}
                nombres={el.nombres}
                imagen={el.imagen ? el.imagen : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgemhlS2C1Ldo2xTSqZVm5aAXUGT3DaaJZVRLgof7-GCoq7n0YnVnC7zkRHkpdQr4j4Zk&usqp=CAU'}
                descripcion={el.descripcion}
                Profesions={el.Profesions.length ? el.Profesions.map(e => e): 'nada'}
              />
            ))}
        </section>
        <section className={styles.publicar}>Anunciarse/Publicar</section>
        <section className={styles.destacados}>
          Profesionales destacados
        </section>
        <section className={styles.footer}>Footer</section>
      </div>
    </div>
  );

}

export default Home;
