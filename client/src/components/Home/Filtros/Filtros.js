import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'


export const Filtros = ({ handleFilterChanges, resetValues , filters}) => {


  const empleos = useSelector(state => state.empleos)
  const ciudades = useSelector(state => state.ciudades)

  const { profesion, promedio, genero, ciudad} = filters

  const styleBtn = {
    color: 'grey',
    textShadow: '0px 1px white',
    width: '5rem',
    height: '2rem',
    fontSize: '19px'
  }

  return (
    <div className={styles.container}>

    <div className={styles.filtro}>
      <label className={styles.label}>Sector</label>
      <select className={styles.select} name="profesion" onChange={handleFilterChanges} value={profesion}>
        <option value=''>Todos</option>
        {empleos?.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Puntaje</label>
      <select className={styles.select} name="promedio" onChange={handleFilterChanges} value={promedio}>
        <option key={0} value='' >Todos</option>
        <option key={1} value='1' >+1</option>
        <option key={2} value='2' >+2</option>
        <option key={3} value='3' >+3</option>
        <option key={4} value='4' >+4</option>
        <option key={5} value='5' >5</option>
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Ciudad</label>
      <select className={styles.select} name="ciudad" onChange={handleFilterChanges} value={ciudad}>
        <option value=''>Todas</option>
        {ciudades?.map(ciudad => <option key={ciudad} value={ciudad}>{ciudad}</option>)}
      </select>
    </div>
    
    <div className={styles.filtro}>
      <label className={styles.label}>Género</label>
      <select className={styles.select} name='genero' onChange={handleFilterChanges} value={genero}>
        <option value=''>Ambos</option>
        <option value={'hombre'}>Hombre</option>
        <option value={'mujer'}>Mujer</option>
      </select>
    </div>
    
    <div className={styles.filtro}>
      <button 
      className={styles.btn}
      onClick={resetValues}
      ><i style={styleBtn} class="fa-solid fa-rotate-left"></i>
      </button>
    </div>

    </div>
  )
}
