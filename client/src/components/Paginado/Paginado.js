import React from "react";
import "./Paginado.css"

export default function Paginado({personasPerPage, allPersonas, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPersonas/personasPerPage); i++){
        pageNumbers.push(i)
    }
    return(
    <nav className={"nav"}>
        <ul className={"paginado"}>
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={"number"} key={number}>
                 <button className={"img"} onClick={() => paginado(number)}>{number}</button>
             </li>
            ))}
        </ul>
    </nav>

    )
    
}