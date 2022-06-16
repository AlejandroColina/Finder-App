import React from "react";
import { getPefil } from "../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ChatPerfil.css";

const MisChats = () => {
  const dispatch = useDispatch();
  const StatePerfil = useSelector((state) => state.perfil);
  const losChats = StatePerfil[0].chats;
  console.log(losChats);
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getPefil(user?.email));
  }, [dispatch, user?.email]);

  return (
    <div>
      <h1 className="chatTittle">Mis Chats</h1>
      <div className="contChat">
        {StatePerfil[0].chats &&
          StatePerfil[0].chats.map((e) => {
            return (
              <div className="listChat">
                <ul>
                  <Link to={`/chat/${e.chat}`}>
                    <button className="buttonChat">{e.name}</button>
                  </Link>
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MisChats;
