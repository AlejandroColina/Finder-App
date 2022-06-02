import React from 'react'
import styles from './styles.module.css';


export const ContactDetail = ({ MyDetail }) => {
  
  const { telefono, email, documento } = MyDetail
  
    return (
    <div className={styles.container}>
        <h3 className={styles.title}>Datos de contacto:</h3>
         
         <p className={styles.dato}>Telefono: {telefono}</p>
         <p className={styles.dato}>Email: {email}</p>
         <p className={styles.dato}>DNI: {documento}</p>
    </div>
  )
}
