import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getDeleteDetail, 
  getPublicacionDeUsuario, getOpiniones, 
  getPreguntas,responderPregunta } from "../Redux/actions/index";
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
import { Helmet } from 'react-helmet'
import Footer from '../Footer/Footer';
import Help from '../Help/Help';
import Comentar from './Comentar/Comentar';
import Preguntar from './Preguntar/Preguntar';


export default function Detail({Profesions}) {
   const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  } 
  
  
  
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.detail);
  const opiniones = useSelector(state=> state.opiniones);
  const preguntas = useSelector(state=> state.preguntas);
  
  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getPublicacionDeUsuario(MyDetail.email));
    dispatch(getOpiniones(id));
    dispatch(getPreguntas(id));
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

    const[input,setInput]= useState({
      respuesta:''
    })

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const [comento, setComento]=useState(false);
    const [open,setOpen] =useState(false);
    const Todaspublicaciones  = useSelector((state)=>state.publicacionesDeUnaPersona);
    const publicaciones = Todaspublicaciones.filter((p)=>p.id!==MyDetail.id);
    return (   
      <>
      { (!MyDetail.nombres) ?
         <Helmet><title>Cargando..</title></Helmet>
        : <Helmet><title>{`${MyDetail.nombres}`} - Finder </title></Helmet>
      }
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
          <Preguntar nombre={user.name}  publicacion={id} />
          <div className={s.commentsBox}>
          {preguntas? preguntas.map((p)=> <div key={p.id}>
          <div className={s.containerComments}>
            <div className={s.pregunta}>{p.pregunta}</div>
            <>{p.respuesta? <><div className={s.respuesta}><div className={s.figura}></div>{p.respuesta}</div> </>: 
          <form 
            className={s.form}
            onSubmit={(e)=>{
            e.preventDefault();
            dispatch(responderPregunta(p.id,input));
            Swal.fire({text:'Tu respuesta fue enviada!', icon:'succes'})
            setTimeout(history.push('./'), 1000)}}>
            <textarea 
            className={s.input}
            name='respuesta'
            rows='6'
            type='text'
            onChange={(e)=>handleChange(e)}
            value={input.respuesta} required/>
            <input type='submit' value='responder' className={s.btn}/>
              </form> }</>
          </div>
          </div>)
          : null}
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
          {(order && !comento) ? 
          <Comentar nombre={user.name}  publicacion={id} setComento={setComento} />
           :
            null}
          <div className={s.commentsBox}>
          {opiniones? opiniones.map((r)=> 
          <div className={s.containerComments} key={r.id}>
            <div className={s.commentPersona}>"{r.comentario}"
            <Rating  size='25px' value={r.puntaje} readOnly /></div>
          </div> )
          : null}
          </div>
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