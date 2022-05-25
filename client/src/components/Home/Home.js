import React from "react";
import { render } from "../Redux/actions/index";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import Cards from '../Cards/cards'
function Home() {

 
  
  // const Usuarios = useSelector(state => state.Usuarios )
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(render());
  // },[]);

  return <div><Cards/></div>;

}

export default Home;
