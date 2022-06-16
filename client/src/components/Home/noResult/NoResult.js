import React from "react";
import s from "./NoResult.module.css";
import img from "./search-result-not-found-2130355-1800920.webp";

const NoResult = () => {
  return (
    <div className={s.conte}>
      <div>
        <img className={s.img} src={img} alt="img" />
        <div className={s.center}>
          <h1 className={s.h1}>No se encontraron coincidencias </h1>
        </div>
      </div>
    </div>
  );
};

export default NoResult;
