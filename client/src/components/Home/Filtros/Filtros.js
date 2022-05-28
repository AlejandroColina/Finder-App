import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'


export const Filtros = ({ filters ,handleFilterChanges }) => {

  const empleos = useSelector(state => state.empleos)
  const ciudades = useSelector(state => state.ciudades)


  return (
    <div className={styles.container}>

    <div className={styles.filtro}>
      <label className={styles.label}>Sector</label>
      <select className={styles.select} name="profesion" onChange={handleFilterChanges}>
        <option value=''>Todos</option>
        {empleos?.map(e => <option value={e}>{e}</option>)}
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Puntaje</label>
      <select className={styles.select} name="promedio" onChange={handleFilterChanges}>
        <option value='' >Todos</option>
        <option value='1' >+1</option>
        <option value='2' >+2</option>
        <option value='3' >+3</option>
        <option value='4' >+4</option>
        <option value='5' >5</option>
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Ciudad</label>
      <select className={styles.select} name="ciudad" onChange={handleFilterChanges}>
        <option value=''>Todas</option>
        {ciudades?.map(ciudad => <option value={ciudad}>{ciudad}</option>)}
      </select>
    </div>
    
    <div className={styles.filtro}>
      <label className={styles.label}>Género</label>
      <select className={styles.select} name='genero' onChange={handleFilterChanges}>
        <option value=''>Ambos</option>
        <option value={'hombre'}>Hombre</option>
        <option value={'mujer'}>Mujer</option>
      </select>
    </div>
    
    </div>
  )
}
