import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getDeleteDetail } from "../Redux/actions/index"
import "../Detail/Detail.css"
import NavBar from '../NavBar/NavBar'
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { PaypalCheckoutBtn } from "./PaypalCheckoutBtn";



export default function Detail({Profesions}) {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  }
  
  const product = {
    description: "Comision",
    price: 25
  }

   

  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
    return function(){
      dispatch(getDeleteDetail())  
      }      
  }, [id, dispatch])

    return (   
      <>
              <NavBar/>
              <div className={'conte'}> 
          <div className="ContenedorTotal">

              {/* // SECCION DETALLES */}
                <div className="container1">
                  <h2 className="about">Informacion Del Emprendedor </h2>
                </div> 
              
              <div className="container">
                <div className="product-details">                
                <h2 className="aboutAcerca">Acerca de  </h2>
                <br /> 
                <div className="about">
                <h1 className="aboutTitle">{MyDetail.nombres}{" "}{MyDetail.apellidos}</h1>        
                <h1 className="aboutTitle">C.C:  {""} {MyDetail.documento}</h1>                               
                <br /> 
                <h1 className="aboutTitle">{MyDetail.ciudad}, {MyDetail.pais}</h1> 
                <h1 className="aboutTitle">{MyDetail.direccion}</h1>
                <br />
                <h1 className="aboutTitle">Edad:{""} {MyDetail.edad}</h1>
                <h1 className="aboutTitle">Puntaje: {""} ⭐ {MyDetail.promedio}</h1>
                                <h1 className="aboutTitle">Genero:{""} {MyDetail.genero}</h1> 
                  
                </div>               
                


                <div className="control">
                  {/* <button className="btn">
                    <span className="price">80.000 $ </span>
                    <span className="shopping-cart"><i 
                    className="fa fa-shopping-cart" 
                    aria-hidden="true"></i></span>
                    <span className="buy">
                      Contratar
                    </span>
                  </button>                 */}
                   <div className="paypal-button-container">
                     <PaypalCheckoutBtn product={product} />
                   </div>
                </div>                    
              </div>                
                <div className="product-image">
                  
                  <img className="divimg" src={MyDetail.imagen} alt="imagen_src"></img>
                  

                  <div className="info">
                    <h2 className="aboutD">Descripcion</h2>
                      <h1 className="aboutDescripcion">{MyDetail.descripcion}</h1>                     
                      <h1 className="aboutD">Profesiones</h1>
                      <h1 className="aboutDescripcion">{MyDetail.Profesions}</h1>
                  </div>
                </div>
              </div> 
              <br />               
              <br />               
              <br />

            </div>    
              <Link to="/home">
                <button className="btnVolver">Volver</button>               
              </Link>
              </div>
      </>     
      
    )}
  

    