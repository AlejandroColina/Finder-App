import React, { useState } from "react";
import { useFormik } from "formik";


const validate = (values) => {
  const errors = {};
  if (!values.nombres) {
    errors.nombres = "Campo Requerido";
  } else if (values.nombres.length > 15) {
    errors.nombres = "El máximo permitido es de 15 caractéres";
  }

  if (!values.apellidos) {
    errors.apellidos = "Campo Requerido";
  } else if (values.nombres.length > 15) {
    errors.apellidos = "El máximo permitido es de 20 caractéres";
  }

  if (!values.email) {
    errors.email = "Campo Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Dirección de correo inválida";
  }

  return errors;
};

const CustomerCreate = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  //Cloudinary
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/userfiles/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="formCont">
      <form onSubmit={formik.handleSubmit}>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <img src={image} style={{ width: "300px" }} alt="File Not Found" />
        )}

        <input
          className="registro"
          onChange={uploadImage}
          name="file"
          type="file"
          placeholder="Cargar Imagen"
        />

        <label htmlFor="nombres"></label>
        <input
          id="nombres"
          placeholder="Nombres"
          name="nombres"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nombres}
        />
        {formik.touched.nombres && formik.errors.nombres ? (
          <div>{formik.errors.nombres}</div>
        ) : null}

        <label htmlFor="apellidos"></label>
        <input
          id="apellidos"
          placeholder="Apellidos"
          name="apellidos"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.apellidos}
        />
        {formik.touched.apellidos && formik.errors.apellidos ? (
          <div>{formik.errors.apellidos}</div>
        ) : null}
        <label htmlFor="email"></label>
        <input
          id="email"
          placeholder="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <button type="submit">Registrarse!</button>
      </form>
    </div>
  );
};

export default CustomerCreate;
