import React, { Suspense, useEffect, useRef, useState } from 'react';

const Destacados = React.lazy(
    () => import('./Destacados')
)

// HOOK para Lazyload
function useNearScreen( {distancia = '100px'}){
    
    const [isNearScreen, setShow] = useState(false)
    const fromRef = useRef()

    useEffect(() => {

      const onChange = ( entries, observer) => {
          const element = entries[0]

          if(element.isIntersecting){
              setShow(true)
              observer.disconnect()
          }
      }

      const observer = new IntersectionObserver(onChange, {
          rootMargin: distancia
      })
    
      observer.observe(fromRef.current)

      return () => observer.disconnect()

    })
    return {isNearScreen , fromRef}
}

export default function LazyDestacados ( props ){

   
    const {isNearScreen, fromRef} = useNearScreen({ distancia: '200px' })


    
    
    return <div ref={fromRef}>
        <Suspense fallback={<h3>Cargando..</h3>}>
        { isNearScreen ? <Destacados {...props}/> : <h3>Cargando..</h3>}
        </Suspense>
           </div>

}