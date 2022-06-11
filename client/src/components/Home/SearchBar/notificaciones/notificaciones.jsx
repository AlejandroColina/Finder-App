import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import { useDispatch,useSelector } from "react-redux";
import { getPefil } from '../../../Redux/actions';
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Notificaciones({setOpen,email}){
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPefil(email))
  },[dispatch])
  const perfil = useSelector(state=>state.perfil)
    return(
        <>
          <CssBaseline />
          <Paper square>
            <List sx={{ mb: 2 }}>
              {perfil.notificaciones? perfil.notificaciones.map((n) => (
                  <Link to={`/trabajo${n.PublicacionId}`} key={n.PublicacionId} ><ListItem button>
                    {n.respuesta?
                    <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={n.profesional[1]} />
                    </ListItemAvatar>
                    <ListItemText primary='Respondieron tu pregunta' secondary={n.respuesta} />
                    </> 
                    : null }
                    
                    {n.pregunta && !n.respuesta?
                    <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={n.user[1]} />
                    </ListItemAvatar>
                    <ListItemText primary='Te hicieron una pregunta' secondary={n.pregunta} />
                    </> 
                    : null }
                    
                    {n.comentario?
                    <>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src="https://www.anordest.it/wp-content/uploads/2018/03/Assicurazioni-in-aumento-in-Emilia.png" />
                    </ListItemAvatar>
                    <ListItemText primary='Felicitaciones Sumaste puntos !' secondary={n.comentario} />
                    </> 
                    : null }
                    
                  </ListItem>
                  </Link>
              )): <div>no tienes notificaciones</div>} 
            </List>
          <div onClick={setOpen(false)}>cerrar</div>
          </Paper>
        </>
    )
}