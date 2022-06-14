import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


export const Filtros = ({ handleFilterChanges, resetValues , filters}) => {


  const empleos = useSelector(state => state.empleos)
  const ciudades = useSelector(state => state.ciudades)

  const { profesion, promedio, genero, ciudad, edad } = filters

  const styleBtn = {
    color: 'black',
    textShadow: '0px 1px white',
    width: '5rem',
    height: '2rem',
    fontSize: '19px'
  }

  return (
    <div className={styles.container}>

    <div className={styles.filtro}>
      <select className={styles.select} name="profesion" onChange={handleFilterChanges} value={profesion}>
        <option value=''>Sector</option>
        {empleos?.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
    </div>

    <div className={styles.filtro}>
      <select className={styles.select} name="ciudad" onChange={handleFilterChanges} value={ciudad}>
        <option value=''>Ciudad</option>
        {ciudades?.map(ciudad => <option key={ciudad} value={ciudad}>{ciudad}</option>)}
      </select>
    </div>
    
    {/* <div className={styles.filtro}>
      <label className={styles.label}>Género</label>
      <select className={styles.select} name='genero' onChange={handleFilterChanges} value={genero}>
        <option value=''>Ambos</option>
        <option value={'hombre'}>Hombre</option>
        <option value={'mujer'}>Mujer</option>
      </select>
    </div> */}
    <div className={styles.filtro}>
      <select  className={styles.select} name='edad' onChange={handleFilterChanges} value={edad}>
        <option value=''>Edad</option>
        <option value={30}>Hasta 30 años</option>
        <option value={40}>Hasta 40 años</option>
        <option value={'mayor'}>Mayor de 40 años</option>
      </select>
    </div>
    <div className={styles.filtro}>
      <select  className={styles.select} name='precio' onChange={handleFilterChanges} value={edad}>
        <option value=''>Precio</option>
        <option value='precioAlto'>Mas Alto</option>
        <option value='precioBajo'>Mas Bajo</option>
      </select>
    </div>

    <div className={styles.filtro}>
          <div className={styles.label}>{promedio >0?
            <Box>
              <Rating
               size="large" 
               value={promedio} readOnly/>
            </Box>  : 'Promedio'}</div>

              <input type='range' min='0' max='5'onChange={handleFilterChanges}
               name='promedio'
               value={promedio}/>
      {/* 
      <label className={styles.label}>Puntaje</label>
      <select className={styles.select} name="promedio" onChange={handleFilterChanges} value={promedio}>
        <option key={0} value='' >Todos</option>
        <option key={1} value='1' >+1</option>
        <option key={2} value='2' >+2</option>
        <option key={3} value='3' >+3</option>
        <option key={4} value='4' >+4</option>
        <option key={5} value='5' >5</option>
      </select> */}
    </div>

    
    <div className={styles.reset}>
      <button className={styles.remove} onClick={resetValues}>🗑</button>
      <div className={styles.elim}>ELIMINAR</div>
      <div className={styles.elim}>FILTROS</div>
    </div>

    </div>
  )
}
