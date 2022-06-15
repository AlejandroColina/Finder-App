import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import logoutImg from '../../../assets/logout_white.png';
import logo from '../../../assets/logo_finder_white.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Notificaciones from '../notificaciones/notificaciones';


export const SearchBar = ( {setDescripcion, descripcion }) => {
    //autenticacion
    
    const { isAuthenticated, user } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    if (isAuthenticated) {
      var onlyFirst = user.name.split(' ');
    }
  
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    setDescripcion(searchRef.current.value)
    searchRef.current.value = ''
  }
  
  const styleLupa = { position: 'absolute', marginRight: '-550px', color: '#0575E6', fontSize: '17px' }


    return (
     <div className={styles.header}>
                
              <Link to='/'>  <img className={styles.logo} src={logo} alt='finder' /> </Link>
           
                <form onSubmit={handleSubmit}  className={styles.search}>
                 <i style={ styleLupa } class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className={styles.input} name='job' placeholder="Busca un talento" ref={searchRef} />
                    {/* <button className="search__button">


  const perfil = useSelector((state) => state.perfil);

  return (
    <header className={styles.header}>

      <Link to={'/'} ><img className={styles.logo} src={logo} alt='finder' /> </Link>

      <form onSubmit={handleSubmit} className={styles.search}>
        <input type="text" className={styles.input} name='job' placeholder="Busca un talento" ref={searchRef} />
        {/* <button className="search__button">

                        <svg className="search__icon">
                          
                        </svg>
                    </button> */}
      </form>

      {isAuthenticated ?
        <nav className={styles.userNav}>{/* 

                    <div className={styles.iconBox}>
                        <img src={notification} alt='notifications' height='30px'/>
                        {notificaciones.length>0 ? <button className={styles.notification} onClick={()=>setOpen(true)}>{notificaciones.length}</button> : null}
                    </div> */}

          <div className={styles.userNav}>

          {isAuthenticated && <Notificaciones/>}
            <img className={styles.userPhoto} src={user.picture} alt='avatar' />

          </div>

          <div className={styles.userNav}>

            <Link to={`/perfil/${user.email}`} className={styles.userName}><div title='Mi Perfil' >{onlyFirst[0].toUpperCase()}</div></Link>
            <button title='Salir' className={styles.salir} onClick={() => logout({ returnTo: window.location.origin })}>
              <img src={logoutImg} alt='logout' height='25px' /></button>

          </div>

        </nav> :
        <nav className={styles.userNav}>
          <div onClick={() => { loginWithRedirect() }} className={styles.userName}>INGRESA</div>
        </nav>
      }
            </div>
  )
}
