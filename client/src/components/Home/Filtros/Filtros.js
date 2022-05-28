import React from 'react'
import styles from './styles.module.css'


export const Filtros = ({ filters ,handleFilterChanges }) => {

  let tipos = [
    "Abastecimiento y Logistica",
    "Administracion,Contabilidad y Finanzas",
    "Atencion al Cliente",
    "Comercial, Ventas y Negocios",
    "Diseño",
    "Educacion y Docencia",
    "Enfermeria",
    "Gastronomia y Turismo",
    "Ingenieria civil y Construccion",
    "Ingenierias",
    "Legales",
    "Marqueting y Publicidad",
    "Oficios y otros",
    "Tecnologia, sistemas y Telecomunicaciones"
    ]



  let ciudades = ['Buenos Aires', 'Medellin', 'Santiago', 'Montevideo', 'Córdoba']

  return (
    <div className={styles.container}>

    <div className={styles.filtro}>
      <label className={styles.label}>Sector</label>
      <select className={styles.select}>
        {tipos?.map(t => <option>{t}</option>)}
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Puntaje</label>
      <select className={styles.select} name="promedio" onChange={handleFilterChanges}>
        <option value='1' >+1</option>
        <option value='2' >+2</option>
        <option value='3' >+3</option>
        <option value='4' >+4</option>
        <option value='5' >5</option>
      </select>
    </div>

    <div className={styles.filtro}>
      <label className={styles.label}>Ciudad</label>
      <select className={styles.select}>
        {ciudades?.map(ciudad => <option>{ciudad}</option>)}
      </select>
    </div>
    
    <div className={styles.filtro}>
      <label className={styles.label}>Género</label>
      <select className={styles.select} name='genero' onChange={handleFilterChanges}>
        <option value={'hombre'}>Hombre</option>
        <option value={'mujer'}>Mujer</option>
      </select>
    </div>
    
    </div>
  )
}
