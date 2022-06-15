import React from "react";
import s from "./cards.module.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {addFavoritos} from '../../Redux/actions/index'
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
export default function Cards({
  nombres,
  imagen,
  descripcion,
  promedio,
  Profesions,
  id,
  logoProfesion,
  ciudad,
  precio
}) { 
 
  
  const { user } = useAuth0();
 const dispatch = useDispatch();
  const handleOnClick = () => {
   dispatch(addFavoritos(user?.email, id))
  }

  return (
    <div key={`${id}F`} className={s.container}>
      <header>
      
        <div className={s.bio}>
          <img src={logoProfesion} alt="background" className={s.bg} />

          <div className={s.desc}>
            <p>{descripcion}</p>
          </div>
        </div>

        <div className={s.avatarcontainer}>
          <img src={imagen} alt="avatar" className={s.avatar} />
          <div className={s.centrado}>
            <div className={s.nombre}>{nombres?.split(' ')[0]}</div>
          </div>
          <div className={s.hover}>
            <div className={s.icontwitter}></div>
          </div>
        </div>
      </header>
      
      <div className={s.content}>
            <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating size="large" value={promedio} readOnly />
            </Box>
        <div  className={s.profesion}>{Profesions}</div>
        <div  className={s.profesion}><strong>${precio}</strong></div>
        <div className={s.buttons}>
      <button className={s.fav} onClick={handleOnClick}>♡</button>
        <Link to={`/trabajo/${id}`} className={s.vermas}>
              ver »
        </Link>
        </div>
      </div>
    </div>
  );
}
