import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Redux/actions/index"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Contratar.css"

export default function Contratar() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const MyDetail = useSelector(state => state.detail)
    console.log(MyDetail)
    const [requerimientos, setRequerimientos] = useState({requerimientos: "", direccion: "", fecha: "", telefono: ""});
    console.log(requerimientos)

    useEffect(() => {
        dispatch(getDetail(id))    
      }, [id, dispatch])

      const selectedChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRequerimientos({...requerimientos, [name]:value}) 
    }

    return(
     <div className="fondo">
         <div>
             <form className="contratar">
                  <div className="card">
                      <h1 className="nombre">Coordina con {MyDetail.nombres}</h1>
                      <img className= "img" src= {MyDetail.imagen} alt="img not found"></img>
                      <p className="nombre">{MyDetail.nombres} {MyDetail.apellidos}</p>
                      <p className="nombre">puntaje: {MyDetail.promedio} estrellas</p>
                      <p className="nombre">{MyDetail.descripcion}</p>
                      </div>
                  <div>
                    <p>
                        Contale a {MyDetail.nombres} lo que necesitas!
                        <textarea name="requerimientos"
                                  value={requerimientos.requerimientos}
                                  onChange={selectedChange}
                                  placeholder={`Contale a ${MyDetail.nombres} quien eres y que es lo que necesitas`} rows="10" cols="40">Escribe aquí tus comentarios</textarea>
                                  </p>
                            <p>
                        por seguridad, te recomendamos no poner tu dirección exacta, sólo zona o localidad
                        <input name="direccion"
                                value={requerimientos.direccion}
                                onChange={selectedChange}
                                placeholder="Ej. Monte Grande,Buenos aires"/>
                                </p>
                                <p>
                                Para cuando necesitas de sus servicios?
                        <input name="fecha"
                                value={requerimientos.fecha}
                                onChange={selectedChange}
                                placeholder="Ej. 20/01/2022"/>
                                </p>
                        <p>
                            Añadi tu contacto!
                            <input name="telefono" 
                                    value={requerimientos.telefono}
                                    onChange={selectedChange}
                                    placeholder="Ej. 11 98752897"/>
                        </p>
                  </div>
                  <div>
                        <Link to=""><button className="siguiente">Siguiente</button></Link>
                    </div>

             </form>
         </div>
     </div>
    )
        

    
}