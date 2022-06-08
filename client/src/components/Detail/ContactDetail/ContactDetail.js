import React from "react";
import styles from "./styles.module.css";

export const ContactDetail = ({ MyDetail }) => {
  const { telefono, email, documento } = MyDetail;
  console.log(MyDetail);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Datos de contacto:</h3>

      <p className={styles.dato}>Telefono: {telefono}</p>
      <a
        href="https://wa.me/3535082917?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
        className="whatsapp"
        target="_blank"
      >
        {" "}
        <i className="fa fa-whatsapp whatsapp-icon"></i>
      </a>
      <p className={styles.dato}>Email: {email}</p>
      <p className={styles.dato}>DNI: {documento}</p>
    </div>
  );
};
