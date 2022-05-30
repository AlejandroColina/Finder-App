import React from 'react';
import styles from "./styles.module.css";

export default function Paginado({personasPerPage, allPersonas, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPersonas/personasPerPage); i++){
        pageNumbers.push(i)
    }
    return(
    <nav >
        <ul className={styles.ul}>
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={styles.li}  key={number}>
                 <button className={styles.botones_paginado} onClick={() => paginado(number)}>{number}</button>
             </li>
            ))}
        </ul>
    </nav>

    )
    
}