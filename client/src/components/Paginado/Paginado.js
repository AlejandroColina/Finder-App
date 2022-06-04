import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function Paginado({personasPerPage, allPersonas, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPersonas/personasPerPage); i++){
        pageNumbers.push(i)
    }

    const [page, setPage] = useState(1); //estado

    

    const stylesNext = {
        color: 'whitesmoke',
        margin: '5px 20px',
        backgroundColor: 'rgb(0 76 203)',
        fontSize: '17px',
        fontWeight: 'bolder',
        padding: '6px 18px',
        letterSpacing: '1px',
        border: '3px solid gray'
    }

    return(
    <nav >
        <ul className={styles.ul}>
            <div className={styles.li}>
            <li ><button style={stylesNext} className={styles.botones_paginado}
             onClick={() => {
                 if(page === 1) return;
                 paginado(page - 1)
                 setPage(page - 1)
                 }} >
                 
                 <i class="fa-solid fa-arrow-left"></i></button></li>
           
           
            {pageNumbers &&
            pageNumbers.map(number=> (
            <li  key={number} >
                 <button style={(page === number)? { backgroundColor:' #0576e67a'} : null } 
                 className={styles.botones_paginado} 
                 onClick={() => {
                     
                     paginado(number)
                     setPage(number)
                    }                 
                 }>{number}</button>
             </li>
            ))}
           
           
             <li ><button style={stylesNext} className={styles.botones_paginado}
              onClick={() => {
                  if(page===6) return;
                  paginado(page+1)
                  setPage(page + 1)
                  console.log(page)
                  }} >
                  <i class="fa-solid fa-arrow-right"></i></button></li>
             </div>
        </ul>
    </nav>

    )
    
}