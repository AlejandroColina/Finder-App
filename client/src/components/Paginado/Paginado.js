

export default function Paginado({personasPerPage, allPersonas, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPersonas/personasPerPage); i++){
        pageNumbers.push(i)
    }
    return(
    <nav >
        <ul >
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li  key={number}>
                 <button onClick={() => paginado(number)}>{number}</button>
             </li>
            ))}
        </ul>
    </nav>

    )
    
}