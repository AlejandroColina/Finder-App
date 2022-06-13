import React, {useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import { Container } from "@mui/system";
import NewMessage from "./NewMessage"
import { makeStyles } from "@material-ui/core/styles";
import CustomAvatar from "./CustomAvatar";
import { useAuth0 } from '@auth0/auth0-react';
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";

const useStyles = makeStyles(theme =>({
    text:{
      padding: theme.spacing(2,2,0),
    },
    paper:{
        paddingBotton: 50,
        height: "70vh"
    },
    list:{
        marginBottom: theme.spacing(2),
        maxHeight: `100%`,
        overflow: `auto`,
    }
}));

const Chat = () =>{
    const { isAuthenticated, user } = useAuth0();
    const [messages, setMessages] = useState([])
    const control = [];
    const styles = useStyles();
    const chatDomRef = useRef();
    const { name } = useParams();

    const addMessage = (message) =>{
      const controlado = messages.map(e =>{
        control.push(e.date)
      });
      if(!control.includes(message.date))
      messages.push(message)
      setMessages([...messages.sort((a, b)=> a.date - b.date)])

      if(chatDomRef.current){
        chatDomRef.current.scrollTop = chatDomRef.current.scrollHeight;
      }
    }


    useEffect(()=>{
     const chatRef = firebase.database().ref(`/chat/${name}`);
     chatRef.on("child_added",
          snapshot => {
            //nuevo mensaje
            const messageItem = snapshot.val();
            console.log(messageItem.user)
            //leer datos del usuario
            firebase.database().ref(`/users/${messageItem.user}`)
            .once(`value`)
            .then((userResp)=>{
                
                messageItem.user = userResp.val();
                addMessage(messageItem)
            })
          },
        error =>{
            console.log(error)
            
        }      
     )
    }, []);
    
    return(
        <Container>
        <Paper square sx={{ pb: '50px' }} className={styles.paper}>
        <Typography className={styles.text} variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Chat
        </Typography>
        <List sx={{ mb: 2 }} className={styles.list} ref={chatDomRef}>
          {messages.map(({ date, user, message }) => (
            
              <ListItem button key={date}>
                <ListItemAvatar>
                <CustomAvatar name={user.name} avatar={user.picture} size="md"/>
                </ListItemAvatar>
                <ListItemText primary={user ? user.name : "Not found"} secondary={message} />
              </ListItem>
          ))}
        </List>
      </Paper>
      <NewMessage/>
      </Container>
    );
 };

 export default Chat;