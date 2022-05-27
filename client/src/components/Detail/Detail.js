import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getDetail } from "../Redux/actions/index"
import { Link } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const MyDetail = useSelector(state => state.Detail)

  useEffect(() => {
    dispatch(getDetail(id))      
  }, [id, dispatch])

  return (
    <div>
        <h1 >Detalles del Programador :</h1>

        <div>
            <h1>{MyDetail.nombres}</h1>
        </div>
        <div>
            <h1>{MyDetail.apellidos}</h1>
        </div>
        <div>
            <h1>{MyDetail.documento}</h1>
        </div>
        <div>
            <h1>{MyDetail.telefono}</h1>
        </div>
        <div>
            <h1>{MyDetail.redes_sociales}</h1>
        </div>
        <div>
            <h1>{MyDetail.telefono}</h1>
        </div>
        <div>
          <h1> {MyDetail.email}</h1>
        </div>
        

        <Link to="/home">
          <button className="backButton">Volver</button>
        </Link>
        
    </div>
  )
}
