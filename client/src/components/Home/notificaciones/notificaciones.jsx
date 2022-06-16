import React,{useEffect, useState} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link, useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import notification from '../../../assets/notification_white.png';
import s from './notificaciones.module.css';
import { getNoti,readNoti } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Notificaciones(){
  //autenticacion
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false);
  const { user } = useAuth0();
  //id notificacion
  const history = useHistory();

  useEffect(()=>{
    dispatch(getNoti(user.email))
  },[dispatch])
  const notificaciones = useSelector((state)=>state.notificaciones);
console.log(notificaciones);

  const handleDelete = (id)=>{
    dispatch(readNoti(user.email,id));
    setTimeout(() => {
    dispatch(getNoti(user.email)); 
    history.push(`/trabajo/${id}`);
  }, 1000)}

    return(
          <>{!open &&

           <div className={`${s.iconBox} ${s.position}`}>
            <img src={notification} alt='notifications' height='30px' className={s.img}/>
            {notificaciones.length>0? <button className={s.notification} onClick={()=>setOpen(true)}>{notificaciones?.length}</button> :null}
             </div>}
            {open &&

            <div  className={`${s.ventana} ${s.position}`}>
          <CssBaseline />
          <Paper square className={s.paper}>
            <List sx={{ mb: 2 }}>

              {notificaciones ? notificaciones.map((n,i) => (
                  <div onClick={()=>handleDelete(n?.PublicacionId)} key={i} className={s.link} ><ListItem button>
                    {n?.pregunta && !n?.respuesta?
                    <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={n?.user[1]} />
                    </ListItemAvatar>
                    <ListItemText primary='Te hicieron una pregunta' secondary={n?.pregunta} />
                    </> 
                    :<>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={n?.profesional[1]} />
                    </ListItemAvatar>
                    <ListItemText primary='Respondieron tu pregunta' secondary={n?.respuesta} /></> }
                    
                    {n?.comentario?
                    <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src="https://www.anordest.it/wp-content/uploads/2018/03/Assicurazioni-in-aumento-in-Emilia.png" />
                    </ListItemAvatar>
                    <ListItemText primary='Felicitaciones Sumaste puntos !' secondary={n?.comentario} />
                    </> 
                    : null }
                    
                  </ListItem>
                  </div>
              )): <div>no tienes notificaciones</div>} 
            </List>
          <div onClick={()=>setOpen(false)} className={s.cerrar}>cerrar</div>
          </Paper></div> }
            </>
    )
}