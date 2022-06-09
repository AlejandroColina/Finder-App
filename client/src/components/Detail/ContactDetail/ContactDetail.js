import React from "react";
import styles from "./styles.module.css";

export const ContactDetail = ({ MyDetail }) => {
  const { telefono, email, documento } = MyDetail;
  console.log(MyDetail);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>Datos de contacto</b></h1>

      <p className={styles.dato}><b>Teléfono:</b>{telefono}</p>
     
      <p className={styles.email}><b>Email:</b> {email}</p>
      <p className={styles.dato}><b>Documento:</b> {documento}</p>
      <a
        href="https://wa.me/3535082917?text=Me%20gustaría%20saber%20el%20precio%20del%20coche"
        className={styles.whatsapp}
        target="_blank"
      >
        <img src="https://png.pngtree.com/element_our/png_detail/20181011/whatsapp-social-media-icon-design-template-vector-png_126998.jpg" alt="" />
      </a>
    </div>
  );
};
