import React, { useEffect } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, getPefil } from "../../Redux/actions";

function ContactDetail() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();
  const MyDetail = useSelector((state) => state.detail);
  const MyPerfil = useSelector((state) => state.perfil);
  const { currentUser } = firebase.auth();
  const { id } = useParams();
  const uid = currentUser ? currentUser.uid : null;
  const teHablo = (e) => {
    axios.patch(
      `http://localhost:3001/users/add/${MyDetail.documento}?chat=${uid}_${MyDetail.documento}&name=${MyPerfil[0].nombres}`
    );
    axios.patch(
      `http://localhost:3001/users/agg/${MyPerfil[0].id}?chat=${uid}_${MyDetail.documento}&name=${MyDetail.nombres}`
    );
  };

  useEffect(() => {
    dispatch(getPefil(user?.email));
    dispatch(getDetail(id));
  }, []);

  return (
    <div className={styles.contenedor}>
      <h3 className={styles.title}>DATOS DE CONTACTO</h3>
      <div className={styles.section}>
        <i className="fa-solid fa-phone"></i>
        <h4 className={styles.dato}>Teléfono:</h4>
        <h5 className={styles.info}>{MyDetail.telefono}</h5>
      </div>
      <div className={styles.section}>
        <i className="fa-solid fa-envelope"></i>
        <h4 className={styles.dato}>Email:</h4>
        <br />
        <h5 className={styles.info}>{MyDetail.email}</h5>
      </div>
      <div className={styles.section}>
        <i className="fa-solid fa-address-card"></i>
        <h4 className={styles.dato}>Documento:</h4>
        <h5 className={styles.info}>{MyDetail.documento}</h5>
      </div>
      <Link to={`/chat/${uid}_${MyDetail.documento}`}>
        <button onClick={teHablo} className="boton-home">
          CONTACTAR
        </button>
      </Link>
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
}

export default ContactDetail;
