import axios from "axios";

export function rederCard(profesion, genero, promedio, ciudad, descripcion) {
  return async function (dispatch) {
    dispatch(loanding());
    try {
      let data = await axios.get(
        `http://localhost:3001/users?profesion=${profesion}&genero=${genero}&promedio=${promedio}&ciudad=${ciudad}&descripcion=${descripcion}`
      );
      console.log(data.data);
      return dispatch({
        type: "CARDS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/users");
      return dispatch({
        type: "GET_ADMIN_USERS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/users/trabajo/" + id);
    return dispatch({
      type: "DETAIL",
      payload: json.data,
    });
  };
}
export function getTotalUsersBytype() {
  return async function (dispatch) {
    var tipos = [
      "Abastecimiento y Logistica",
      "Administracion,Contabilidad y Finanzas",
      "Atencion al Cliente",
      "Comercial, Ventas y Negocios",
      "Diseño",
      "Educacion y Docencia",
      "Enfermeria",
      "Gastronomia y Turismo",
      "Ingenieria civil y Construccion",
      "Ingenierias",
      "Legales",
      "Marqueting y Publicidad",
      "Oficios y otros",
      "Tecnologia, sistemas y Telecomunicaciones",
    ];
    let usersByType = [];
    for (let i = 0; i < tipos.length; i++) {
      let jsonTipos = await axios.get(
        `http://localhost:3001/users?profesion=${tipos[i]}`
      );
      let cant = jsonTipos.data.length;
      usersByType.push([tipos[i], cant]);
    }
    return dispatch({
      type: "USER_BY_TYPES",
      payload: usersByType,
    });
  };
}

export const getEmpleos = () => {
  let url = "http://localhost:3001/users/empleos";

  return async (dispatch) => {
    const resp = await axios.get(url);
    return dispatch({
      type: "GET_EMPLEOS",
      payload: resp.data,
    });
  };
};

export const getEmpleosForm = () => {
  let url = "http://localhost:3001/users/empleosForm";

  return async (dispatch) => {
    const resp = await axios.get(url);
    return dispatch({
      type: "GET_EMPLEOS_FORM",
      payload: resp.data,
    });
  };
};
export const getCiudades = () => {
  let url = "http://localhost:3001/users/ciudades";

  return async (dispatch) => {
    const resp = await axios.get(url);
    return dispatch({
      type: "GET_CIUDADES",
      payload: resp.data,
    });
  };
};
export function userMsj(payload) {
  return {
    type: "USER_MSJ",
    payload,
  };
}

export function loanding() {
  return {
    type: "LOADER",
  };
}

export function getDeleteDetail() {
  return {
    type: "GET_DELETE",
  };
}
