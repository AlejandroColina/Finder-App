import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserCreate.css";
import { Image } from "cloudinary-react";
import pic from "./img_fast.png";
import "./UserCreate.css"
// import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";

export default function UserCreate() {
  const [imageSelected, setImageSelected] = useState("");

  //Cloudinary
  const uploadImage = () => {
    let formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "preset");
    axios
      .post("https://api.cloudinary.com/v1_1/userfiles/image/upload", formData)
      .then((response) => console.log(response));
  };

  return (
    <>
      <div className="formCont">
        <img src={pic} alt="" />
        <div className="registro">
          <div className="form">
            <form>
              <h4>Formulario de Registro</h4>
              <Image
                className="img"
                style={{ width: 100 }}
                cloudName="userfiles"
                publicId="https://res.cloudinary.com/userfiles/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1653536600/sfi2odzee6xtmggfgxhl.png"
              />

              <input
                className="registro"
                onClick={uploadImage}
                name="apellidos"
                type="file"
                placeholder="Apellidos"
                size="lg"
                
              />

              <input
                className="registro"
                size="lg"
                name="nombres"
                type="text"
                placeholder="Nombres"
               
              />

              <input
                className="registro"
                name="apellidos"
                type="text"
                placeholder="Apellidos"
                size="lg"
                
              />

              <input
                className="registro"
                name="edad"
                type="number"
                placeholder="Edad"
                size="lg"
               
              />

              <input
                className="registro"
                name="email"
                type="email"
                placeholder="Email"
                size="lg"
              
              />

              <input
                className="registro"
                name="documento"
                type="number"
                placeholder="Documento"
                size="lg"
             
              />

              <input
                className="registro"
                as="textarea"
                name="descripcion"
                type="text"
                placeholder="Descripcion"
                rows={3}
                size="lg"
            
              />

              <input
                className="registro"
                name="telefono"
                type="number"
                placeholder="Teléfono"
                size="lg"
             
              />

              <input
                className="registro"
                name="direccion"
                type="text"
                placeholder="Dirección"
                size="lg"
            
              />

              <button>Registrarse!</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// select con  tipos  de profesiones
// con axios llamar a la ruta de empleos
