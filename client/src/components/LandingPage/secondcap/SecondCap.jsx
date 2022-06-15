import React, { useState } from "react";
import s from "./SecondCap.module.css";
import one_step from "./img_one_step.png";
import second_step from "./img_second_step.png";
import third_step from "./img_third_step.png";
import { useAuth0, User } from "@auth0/auth0-react";
import fast from "../../../assets/logo_finder_light_blue.png";
import { useHistory } from "react-router-dom";
import Form from "../../perfil/form/Form";
import { Modal, TextField } from "@material-ui/core";

export default function FirstCap() {
  const [modal, setModal] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();

  const abrirCerrarModal = () => {
    setModal(!modal);
  };
  const body = (
    <div className={s.modal}>
      <Form abrirCerrarModal={abrirCerrarModal}/>
    </div>
  );

  return (
    <div className={s.container}>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
      <div className={s.column}>
        <div className={s.title}>Convertite en EMPRENDEDOR</div>
        <p className={s.p}>
          Aumenta tu <span className={s.importantText}>visibilidad</span> en el
          mercado laboral y ofrece tus servicios de forma{" "}
          <span className={s.importantText}>rapida</span> y{" "}
          <span className={s.importantText}>sencilla</span>
        </p>
        <img className={s.imgFinder} src={fast} alt="registrate ahora" />
        {isAuthenticated ? (
          <>
            <p className={s.p}>
              <span className={s.importantText}>{user.name}</span> te damos la
              bienvenida a FINDER !
            </p>
            <button className={s.registrateBtn} onClick={abrirCerrarModal}>
              COMPLETA TU PERFIL
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              loginWithRedirect();
            }}
            className={s.registrateBtn}
          >
            INGRESA
          </button>
        )}
      </div>

      <div className={s.stepsContainer}>
        <div className={s.stepsCard}>
          <div className={s.stepsNumber}>1º</div>
          <div className={s.stepsDetail}>
            Crea tu perfil de emprendedor registrandote en nuestra app
          </div>
          <img className={s.stepsImg} src={one_step} alt="one step" />
        </div>
        <div className={s.stepsCard}>
          <img className={s.stepsImg} src={second_step} alt="second step" />
          <div className={s.stepsDetail}>
            Comparti tus proyectos a traves de fotos y recomendaciones
          </div>
          <div className={s.stepsNumber}>2º</div>
        </div>
        <div className={s.stepsCard}>
          <div className={s.stepsNumber}>3º</div>
          <div className={s.stepsDetail}>
            Suma puntos con tus trabajos realizados y destacate en lo te gusta
            hacer !
          </div>
          <img className={s.stepsImg} src={third_step} alt="third step" />
        </div>
      </div>
    </div>
  );
}
