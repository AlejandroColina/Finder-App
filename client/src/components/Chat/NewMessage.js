import React, {useState} from "react";
import { useParams } from "react-router-dom"
import { Paper } from "@mui/material";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";

const StyledFab = makeStyles(theme =>({
    paper:{
        paddingBotton: 20
    },
    message:{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "0 20px",
    }
}));

const NewMessage = () =>{
  const classes = StyledFab();
  const [message, setMessage] = useState("");
  const { name } = useParams();

  

  const handleKeyDown = ({keyCode}, e) =>{
    if(keyCode !== 13){
      return null
    }
    const { currentUser } = firebase.auth();
    if(!currentUser)return;
    const newMessage ={
        user: currentUser.uid,
        message,
        date:firebase.database.ServerValue.TIMESTAMP
    };
    firebase.database().ref(`/chat/${name}`).push(newMessage)
    .then((res)=>{
        setMessage("");
    })
    .catch((error)=>{
        console.log(error)
        alert(error.message)
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const { currentUser } = firebase.auth();
    if(!currentUser)return;
    const newMessage ={
        user: currentUser.uid,
        message,
        date:firebase.database.ServerValue.TIMESTAMP
    };
    firebase.database().ref(`/chat/${name}`).push(newMessage)
    .then((res)=>{
        setMessage("");
    })
    .catch((error)=>{
        console.log(error)
        alert(error.message)
    })

  }

  return(
    <Paper square className={classes.paper}>
       <form  onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={0} direction="row" className={classes.message}>
            <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name="message"
                  label="Mensaje"
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Grid>
              <Grid item xs={2}>
                <Box>
                  <Button variant="contained" 
                           color="primary"
                          endIcon={<Icon>send</Icon>}
                          fullWidth
                          disabled={!message.length}
                          onClick={handleSubmit}
                          >
                Enviar
                </Button>
                </Box>
              </Grid>
            </Grid>
       </form>
    </Paper>
  )
}

export default NewMessage;