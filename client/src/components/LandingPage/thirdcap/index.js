import React, { Suspense } from "react"
import { useNearScreen } from "../../Home/Destacados"


const ThirdCap = React.lazy(
    () => import('./ThirdCap')
)


export default function LazyDestacadosLanding ( ){

   
    const {isNearScreen, fromRef} = useNearScreen({ distancia: '550px' })


    
    
    return <div ref={fromRef}>
        <Suspense fallback={<h3>Cargando..</h3>}>
        { isNearScreen ? <ThirdCap /> : <h3>Cargando..</h3>}
        </Suspense>
           </div>

}

