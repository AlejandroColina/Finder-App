import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getDeleteDetail, getPublicacionDeUsuario, getOpiniones } from "../Redux/actions/index";
import NavBar from '../NavBar/NavBar';
import s from './Detail.module.css';
import { useAuth0} from '@auth0/auth0-react';
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
import Preguntar from './Preguntar/Preguntar';



export default function Detail({Profesions}) {
/*   const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  } */
  
  
  
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.detail);
  const opiniones = useSelector(state=> state.opiniones);
  console.log(MyDetail)
  
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getPublicacionDeUsuario(MyDetail.email));
    dispatch(getOpiniones(id));
    return function(){
      dispatch(getDeleteDetail())  
    }      
  }, [id, dispatch])
  
  let { promedio } = MyDetail

  let precio = 15
  let price = precio
  
  const product = {
    description: "Comision",
    price: price
  }
 

   const [order, setOrder] = useState(false)
   if(order) {
     console.log(order)
      Swal.fire({ title:'Perfecto!', text:'Has accedido a los contactos del trabajador.¡Contáctalo!', icon:'success' } )

    }
    const [open,setOpen] =useState(false);
    const Todaspublicaciones  = useSelector((state)=>state.publicacionesDeUnaPersona);
    const publicaciones = Todaspublicaciones.filter((p)=>p.id!==MyDetail.id);
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
            {open? 
            <div>
             {(!order) ? 
              <div className={s.paypal}>
               <PaypalCheckoutBtn product={product}  setOrder={setOrder}/>
              </div>
             : <ContactDetail MyDetail={MyDetail}  />
             }<div className={s.valor} onClick={()=>{setOpen(false)}}>Cancelar</div> 
           </div>:
            <div className={`${s.borderPrice} ${s.contratar}`} onClick={()=>{setOpen(true)}}>
              <span className={s.precio}>Contratar</span> 
            </div>}
            <br/>
          </div>
          <br/><br/><br/><br/>
          
          <div className={s.titulos}>Tenes dudas?</div>
          <hr/>
          <Preguntar /* nombre={user.name} */ nombre='cami' publicacion={MyDetail.id} />
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
          {/* {(order) ?  */}
          <Comentar /* nombre={user.name} */ nombre='cami' publicacion={id} />
           {/* /*  :
            null
          */ }
          {opiniones? opiniones.map((r)=> 
          <div key={r.id}>
            <div>{r.persona}</div>
            <div>{r.comentario}</div>
            <Rating  size='small' value={r.puntaje} readOnly />
          </div> )
          : null}
          <br/><br/><br/><br/><br/><br/>
          
           <div className={s.titulos}>Mas Publicaciones del emprendedor</div>
           <hr/>
           <br/><br/>
           <div className={s.cardsContainer}>
           {/* {publicaciones? publicaciones.map((p)=> */}
          <Card className={s.cardUi} sx={{ maxWidth: 345 }} /* key={p.id} */>
          <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://comercioyjusticia.info/elinversorylaconstruccion/wp-content/uploads/sites/9/2015/09/color-pintura.jpg"
            alt="emprendedor"
           />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             PINTOR
            </Typography>
            <Typography variant="body2" color="text.secondary">
             Materiales incluidos, trabajo rapido y prolijo. El valor es por metro2.
            </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          <Card className={s.cardUi} sx={{ maxWidth: 345 }} /* key={p.id} */>
          <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://comercioyjusticia.info/elinversorylaconstruccion/wp-content/uploads/sites/9/2015/09/color-pintura.jpg"
            alt="emprendedor"
           />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
             PINTOR
            </Typography>
            <Typography variant="body2" color="text.secondary">
             Materiales incluidos, trabajo rapido y prolijo. El valor es por metro2.
            </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          </div>{/* ) : null} */}
        </div>
      </div>
      <Footer/>
      <Help/>
      </>
    )}