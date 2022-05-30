import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../Redux/actions/index"
import "../Detail/Detail.css"
import NavBar from '../NavBar/NavBar'
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))      
  }, [id, dispatch])

    return (   
      <>
              <NavBar/>
          <div className="ContenedorTotal">

              {/* // SECCION DETALLES */}
              <div className="container">
                <div className="product-details">
                
                <h2 className="about">Datos del Emprendedor  </h2>  
                <br />              
                <h1 className="about2">{MyDetail.nombres}{" "}{MyDetail.apellidos}</h1>        
                <br />
                <h1 className="about3">C.C:  {" "} {MyDetail.documento}</h1> 
                <br />
                <h1 className="about3">Telefono:{""} {MyDetail.telefono}</h1> 
                <br />
                <h1 className="about3">Email:{""} {MyDetail.email}</h1> 
                <br />
                <h1 className="about3">Edad:{""} {MyDetail.edad}</h1>
                <br />
                <h1 className="about3">Puntuacion: {""} {MyDetail.puntuacion}⭐</h1>
                <br />
                <h1 className="about3">Promedio:{""} {MyDetail.puntuacion}</h1> 

              <div className="control">
                <button className="btn">
                  <span className="price">80.000 $ </span>
                  <span className="shopping-cart"><i 
                  className="fa fa-shopping-cart" 
                  aria-hidden="true"></i></span>
                  <span className="buy">
                    Contratar
                  </span>
                </button>                
              </div>                    
              </div>                
                <div className="product-image">
                  
                  <img src="https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg" alt="Omar Dsoky"></img>
                  
                  <div className="info">
                    <h2 className="aboutD">Descripcion</h2>
                    <ul>
                    <h1 className="aboutDescripcion">{MyDetail.descripcion}</h1> 
                    <br />
                    
                    <br />
                    </ul>
                  </div>
                </div>
              </div> 
              <br />               
              <br />               
              <br />

              <Link to="/home">
                <button className="btnVolver">Volver</button>               
              </Link>
            </div>    
      </>     
    )}
  

    