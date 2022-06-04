import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getDeleteDetail, getPublicacionDeUsuario } from "../Redux/actions/index";
import NavBar from '../NavBar/NavBar';
import s from './Detail.module.css';
import { useAuth0, User } from '@auth0/auth0-react';
import { PaypalCheckoutBtn } from "./PaypalCheckoutBtn";
import Swal from "sweetalert2";
import { ContactDetail } from "./ContactDetail/ContactDetail";
import gps from '../../assets/gps.png';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import Footer from '../Footer/Footer';
import Help from '../Help/Help';
import Comentar from './Comentar/Comentar';



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
    dispatch(getDetail(id));
    dispatch(getPublicacionDeUsuario(MyDetail.email));
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

    const publicaciones  = useSelector((state)=>state.publicacionesDeUnaPersona);
    const Todaspublicaciones = publicaciones.filter((p)=>p.id!==MyDetail.id);
    return (   
      <>
      <NavBar/>
              
      <div className={s.container}>
        
        {/* tarjeta de contacto */}

        <div className={s.card}>

          <div className={s.nombres}><span className={s.espacio}>Hola Soy</span><strong>{MyDetail.nombres} </strong>!</div>
          <img className={s.img} src={MyDetail.imagen} alt={MyDetail.nombres}/>
          <div className={s.ciudad}>
            <img src={gps} alt='ubicacion' className={s.gps}/>
            {MyDetail.ciudad},{MyDetail.pais}
          </div>
          <div className={s.acerca}>Acerca de</div>
          <div className={s.descripcion}>"{MyDetail.descripcion}"</div>
          <br/><br/>

        </div>


        <div className={s.containerInfo}>

          <div className={s.titulos}>SERVICIO</div>
          <hr/>
          <div className={s.subtitulos}>{MyDetail.Profesions}</div>
          <div className={s.contenido}>{MyDetail.descripcion}</div>
          <div className={s.containerPrice}>
            <div className={s.borderPrice}>
              <span className={s.valor}>Valor:</span>
              <span className={s.precio}>{MyDetail.precio}</span> 
            </div>
            <br/>
             {(!order) ? 
              <div className={s.paypal}>
               <PaypalCheckoutBtn product={product} setOrder={setOrder}/>
              </div>
             : <ContactDetail MyDetail={MyDetail}  />
             }
          </div>
          <br/><br/><br/><br/>
          
           <div className={s.titulos}>RESEÑAS
          <Box sx={{ '& > legend': { mt: 2 },}}>
          {MyDetail.promedio?
           <Rating  size='large' value={MyDetail.promedio} readOnly />
           :
           <Rating size='large' name="no-value" value={null} />
          }
          </Box> </div>
          <hr/>
            <Comentar nombre={user.name} publicacion={id} />
          <br/><br/><br/><br/><br/><br/>
          
           <div className={s.titulos}>Mas Publicaciones del emprendedor</div>
           <hr/>
           <br/><br/>
           {publicaciones? publicaciones.map((p)=>
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={p.imagen}
            alt="green iguana"
           />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             {p.Profesions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {p.descripcion}
            </Typography>
          </CardContent>
          </CardActionArea>
          </Card>) : null}

        </div>
      </div>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
      <Footer/>
      <Help/>
      </>
    )}