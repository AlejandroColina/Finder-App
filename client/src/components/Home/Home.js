import React from "react";
import { render } from "../Redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";

function Home() {

 
  
  const Usuarios = useSelector(state => state.Usuarios )
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(render());
  },[]);

  return <div>{Usuarios.map(el => <p>{el.nombre} {el.edad}</p>  )}</div>;

}

export default Home;
