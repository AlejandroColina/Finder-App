import React from "react";
import { render } from "../Redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {

  let usuarios = [{ nombre: 'jose', edad: 99 }]

  const Usuarios = useSelector(state => state.Usuarios)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(render(usuarios));
  }, [dispatch, usuarios]);

  return <div>  <div>{Usuarios.map(el => <p>{el.nombre} {el.edad}</p>)}</div> </div>;

}

export default Home;
