import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function Paginado({personasPerPage, allPersonas, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPersonas/personasPerPage); i++){
        pageNumbers.push(i)
    }

    const [page, setPage] = useState(1); //estado

    const stylesFocus = { backgroundColor:'#0576e6', border:'none', color: '#fff', textShadow: '-2px 1px black'}

    const stylesNext = {
       margin: '5px 20px',
       backgroundColor:'#0576e6',
       textShadow: '1px 1px 3px black'
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
                 ❮</button></li>
           
           
            {pageNumbers &&
            pageNumbers.map(number=> (
            <li  key={number} >
                 <button style={(page === number)? stylesFocus: null } 
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
                  if(page=== pageNumbers.length ) return;
                  paginado(page+1)
                  setPage(page + 1)
                  console.log(page)
                  }} >❯
                  </button></li>
             </div>
        </ul>
    </nav>

    )
    
}