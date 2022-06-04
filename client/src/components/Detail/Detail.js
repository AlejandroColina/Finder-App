import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getDeleteDetail } from "../Redux/actions/index";
import NavBar from '../NavBar/NavBar';
import s from './Detail.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { PaypalCheckoutBtn } from "./PaypalCheckoutBtn";
import Swal from "sweetalert2";
import { ContactDetail } from "./ContactDetail/ContactDetail";
import Comentarios from "../Comentarios/Comentarios";
import gps from '../../assets/gps.png';



export default function Detail({Profesions}) {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  }
  
  
  
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.detail)
  console.log(MyDetail)
  
  useEffect(() => {
    dispatch(getDetail(id))
    return function(){
      dispatch(getDeleteDetail())  
    }      
  }, [id, dispatch])
  
  let price;
  let promedio = Math.floor(MyDetail.promedio)
  if(promedio === 1) price = 10
  if(promedio === 2) price = 15
  if(promedio === 3) price = 25
  if(promedio === 4) price = 35
  if(promedio === 5) price = 50
  
  const product = {
    description: "Comision",
    price: price
  }
 

   const [order, setOrder] = useState(false)
   if(order) {
     console.log(order)
      Swal.fire({ title:'Perfecto!', text:'Has accedido a los contactos del trabajador.¡Contáctalo!', icon:'success' } )

    }



/*     Profesions: "Educacion y Docencia"
    apellidos: "Robledo"
    ciudad: "Buenos Aires"
    descripcion: "Sed officiis quo dolores ut consequuntur temporibus recusandae facere."
    direccion: "83731 Chavez Glorieta"
    documento: "379771"
    edad: 22
    email: "Gonzalo97@yahoo.com"
    genero: "hombre"
    imagen: "https://image.shutterstock.com/image-photo/drummer-playing-drums-smoke-powder-260nw-1040614744.jpg"
    nombres: "Alfonso"
    pais: "Argentina"
    precio: 1750
    promedio: 3
    telefono: "570768" */

    return (   
      <>
      <NavBar/>
              
      <div className={s.container}>
        
        {/* tarjeta de contacto */}

        <div className={s.card}>

          <div className={s.nombres}>Hola Soy<p> </p><strong>{MyDetail.nombres} </strong>!</div>
          <img className={s.img} src={MyDetail.imagen} alt={MyDetail.nombres}/>
          <div className={s.ciudad}>
            <img src={gps} alt='ubicacion' className={s.gps}/>
            {MyDetail.ciudad},{MyDetail.pais}
          </div>

          {(!order) ? 
            <div className="paypal-button-container">
               <PaypalCheckoutBtn product={product} setOrder={setOrder}/>
            </div>
          : <ContactDetail MyDetail={MyDetail}  />
                }

        </div>

      <div className="control">
          {/* <button className="btn">
              <span className="price">80.000 $ </span>
              <span className="shopping-cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
              <span className="buy">
              Contratar
              </span>
              </button>                 */}
      </div>       
              <Comentarios/>
      </div>
      </>
    )}