import React from "react";
import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

export const ContactDetail = ({ MyDetail }) => {
  const { telefono, email, documento } = MyDetail;
  console.log(MyDetail);

  return (
    <div className={styles.contenedor}>
      <h3 className={styles.title}>DATOS DE CONTACTO</h3>
      <div className={styles.section}>
        <i className="fa-solid fa-phone"></i>
        <h4 className={styles.dato}>Teléfono:</h4>
        <h5 className={styles.info}>{telefono}</h5>
      </div>
      <div className={styles.section}>
        <i className="fa-solid fa-envelope"></i>
        <h4 className={styles.dato}>Email:</h4>
        <br />
        <h5 className={styles.info}>{email}</h5>
      </div>
      <div className={styles.section}>
        <i className="fa-solid fa-address-card"></i>
        <h4 className={styles.dato}>Documento:</h4>
        <h5 className={styles.info}>{documento}</h5>
      </div>
      <a
        href="https://wa.me/3535082917?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
        className={styles.whatsapp}
        target="_blank"
      >
        <img
          className={styles.icon}
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt=""
        />
      </a>
    </div>
  );
};
