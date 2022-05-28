import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css';
import perfil from '../../../images/perfil.png'
import { useDispatch } from 'react-redux';

export const SearchBar = ( {setDescripcion, descripcion }) => {
  
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault()
      setDescripcion(searchRef.current.value)
      searchRef.current.value=''
  }
  
    return (
     <header className={styles.header}>
                
                <h3 className={styles.logo}>Finder</h3>
           
                <form onSubmit={handleSubmit}  className={styles.search}>
                    <input type="text" className={styles.input} name='job' placeholder="Busca un talento" ref={searchRef} />
                    {/* <button className="search__button">
                        <svg className="search__icon">
                          
                        </svg>
                    </button> */}
                </form>

                <nav className={styles.userNav}>
                    <div className={styles.iconBox}>
                        <div className={styles.icon}>
                         
                        </div>
                           <span className={styles.notification}>13</span>
                    </div>
                        

                    <div className={styles.iconBox}>
                        <svg className={styles.icon}>
                        </svg>
                        
                    </div>
                    
                    <div className={styles.userNav}>
                        <img src={perfil} alt="User" className={styles.userPhoto}></img>
                        <span className={styles.userName}>Gabriel</span>
                    </div>
                </nav>
           
            </header>
  )
}
