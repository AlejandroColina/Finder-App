import React from "react";
import { getPefil } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MisChats = () =>{
    const dispatch = useDispatch();
    const StatePerfil = useSelector((state) => state.perfil);
    const losChats = StatePerfil[0].chats
  console.log(losChats)
    const { user } = useAuth0();

    useEffect(() => {
        dispatch(getPefil(user?.email));
      }, [dispatch, user?.email]);


    return(
         <div>
            <h1>Mis Chats:</h1>
            { StatePerfil[0].chats && StatePerfil[0].chats.map((e)=>{
              return <ul>
                <Link to={`/chat/${e.chat}`}><button>{e.name}</button></Link>
              </ul>
              
            })   
            }
         </div>
    )
}

export default MisChats;