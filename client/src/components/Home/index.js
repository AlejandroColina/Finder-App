import React from "react";
import { render } from "../Redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";

function Home() {
  let usuarios = [
    { nombre: "jose", edad: 19, trabajo: "pintor" },
    { nombre: "jose", edad: 19, trabajo: "pintor" },
    { nombre: "jose", edad: 19, trabajo: "pintor" },
  ];
  const Usuarios = useSelector(state => state.Usuarios )
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(render(usuarios));
  },[]);

  return <div>{Usuarios.map(el => <p>{el.nombre} {el.edad}</p>  )}</div>;
}

export default Home;
