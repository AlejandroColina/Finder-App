import axios from "axios";
import Swal from 'sweetalert2'

export function rederCard(profesion, precio, promedio, ciudad, descripcion, edad) {
  return async function (dispatch) {
    dispatch(loanding());
    try {
      let data = await axios.get(
        `http://localhost:3001/publicaciones?profesion=${profesion}&precio=${precio}&promedio=${promedio}&ciudad=${ciudad}&descripcion=${descripcion}&edad=${edad}`
      );
      return dispatch({
        type: "CARDS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCarta(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/users/coincidencias/${id}`)
    return dispatch({ type: "CARDST", payload: json.data })
  }
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
    var json = await axios.get("http://localhost:3001/users/detalle/" + id);
    return dispatch({
      type: "DETAIL",
      payload: json.data,
    });
  };
}

export function getTotalUsersBytype() {
  return async function (dispatch) {
    var tipos = [
      "Abastecimiento y Logística",
      "Administración Contabilidad y Finanzas",
      "Atención al Cliente",
      "Comercial Ventas y Negocios",
      "Diseño",
      "Educación y Docencia",
      "Enfermería",
      "Gastronomía",
      "Ingeniería civil y Construcción",
      "Ingenierías",
      "Legales",
      "Marqueting y Publicidad",
      "Oficios y otros",
      "Tecnología sistemas y Telecomunicaciones",
    ];
    let usersByType = [];
    for (let i = 0; i < tipos.length; i++) {
      let jsonTipos = await axios.get(
        `http://localhost:3001/publicaciones?profesion=${tipos[i]}`
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

export function getTotalUsersByCity() {
  return async function (dispatch) {
    var tipos = [
      "Buenos Aires", "Corrientes", "Rosario",
      "Mar del Plata", "Godoy Cruz", "Banfield",
      "La Plata", "Resistencia", "Lanus",
      "Salta", "Quilmes", "Santa Fe", "Córdoba"
    ];
    let usersByCity = [];
    for (let i = 0; i < tipos.length; i++) {
      let jsonTipos = await axios.get(
        `http://localhost:3001/publicaciones?ciudad=${tipos[i]}`
      );
      let cant = jsonTipos.data.length;
      usersByCity.push([tipos[i], cant]);
    }
    return dispatch({
      type: "USER_BY_CITY",
      payload: usersByCity,
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

//mensaje del usuario al administrador a traves de HELP
export function mensajeAlAdmin(msj) {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/mensaje/user",
      msj
    );
    msj.id = response.data.id;
    return dispatch({
      type: "MSJ_USER_AL_ADMIN",
      payload: msj,
    });
    Swal.fire('Listo!',response.data.message, 'success');
  };
}
//traer mensajes para el admin
export function getAdminMsj() {
  return async (dispatch) => {
    const responseget = await axios.get("http://localhost:3001/mensaje/user");
    return dispatch({
      type: "GET_MSJ_ADMIN",
      payload: responseget.data,
    });
  };
}

//abrir el mensaje
export function getOneMsj(id) {
  return async (dispatch) => {
    const detailMsj = await axios.get(
      `http://localhost:3001/mensaje/user/${id}`,
      {}
    );
    return dispatch({
      type: "READ_MSJ_ADMIN",
      payload: detailMsj.data,
    });
  };
}
//leer
export function readMsj(id, read) {
  return async (dispatch) => {
    const updateRead = await axios.put(
      `http://localhost:3001/mensaje/user/${id}`,
      read
    );
    return dispatch({
      type: "OPEN_MSJ_ADMIN",
    });
  };
}

export function getUbicacion() {
  return async (dispatch) => {
    try {
      let api = await axios.get("https://ipapi.co/json/");
      return dispatch({
        type: "UBICACION",
        payload: api.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPefil(email) {
  return async (dispatch) => {
    try {
      let json = await axios.get("http://localhost:3001/users/perfil/" + email);
      return dispatch({
        type: "GET_PERFIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function ValidarInfo(email) {
  return async (dispatch) => {
    try {
      let info = await axios.get(
        "http://localhost:3001/users/validar/" + email
      );
      return dispatch({
        type: "INFO_VALI",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cambiarInfo(email, input) {
  return async (dispatch) => {
    try {
      let info = await axios.patch(
        `http://localhost:3001/users/modificar/${email}?nombres=${input.nombres}&apellidos=${input.apellidos}&telefono=${input.telefono}&documento=${input.documento}&edad=${input.edad}`
      );
      return dispatch({
        type: "MODIFICAR",
        payload: info.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getOpiniones(id) {
  return async (dispatch) => {
    try {
      let opiniones = await axios.get(`http://localhost:3001/comentario/${id}`)
      return dispatch({
        type: 'GET_OPINIONES',
        payload: opiniones.data
      })
    } catch (error) { console.log(error) }
  }
}

export function postOpinion(input) {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/comentario', input)
      return dispatch({
        type: 'POST_OPINION',
      })
    } catch (error) { console.log(error) }
  }
}

export function deleteOpinion(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/comentario/${id}`)
      return dispatch({
        type: 'DELETE_OPINION',
      })
    } catch (error) { console.log(error) }
  }
}

export function getPreguntas(id) {
  return async (dispatch) => {
    try {
      let preguntas = await axios.get(`http://localhost:3001/pregunta/${id}`)
      return dispatch({
        type: 'GET_PREGUNTAS',
        payload: preguntas.data
      })
    } catch (error) { console.log(error) }
  }
}

export function postPregunta(input) {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/pregunta', input)
      return dispatch({
        type: 'POST_PREGUNTA',
      })
    } catch (error) { console.log(error) }
  }
}

export function deletePregunta(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/pregunta/${id}`)
      return dispatch({
        type: 'DELETE_PREGUNTA',
      })
    } catch (error) { console.log(error) }
  }
}

export function responderPregunta(id, input) {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:3001/pregunta/${id}`, input)
      return dispatch({
        type: 'RESPONDER_PREGUNTA',
      })
    } catch (error) { console.log(error) }
  }
}

export function eliminarPost(id) {
  return async dispatch => {
    let borrar = await axios.delete('http://localhost:3001/delete/post/' + id)
    return dispatch({
      type: 'DELETE',
    })
  }
}


export function addFavoritos(email, idPublicacion) {
  return async dispatch => {
    let add = await axios.patch(`http://localhost:3001/favoritos/add/${email}/${idPublicacion}`)
    return dispatch({
      type: 'ADD_FAVORITOS',
      payload: add.data
    })
  }
}

export function getFavoritos(email) {
  return async dispatch => {
    let favo = await axios.get('http://localhost:3001/favoritos/' + email)
    return dispatch({
      type: 'FAVORITO',
      payload: favo.data
    })
  }
}

export function deleteUser(id) {
  return async dispatch => {
    await axios.delete(`http://localhost:3001/delete/user/${id}`)
    return dispatch({
      type: 'DELETE_USER'
    })
  }
}

export function baneoUser(id, estado) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/suspender/${id}/${estado}`)
    return dispatch({
      type: 'BANEAR'
    })
  }
}

export function getBaneo(email) {
  return async dispatch => {
    let res = await axios.get(`http://localhost:3001/suspender/validar/${email}`)
    return dispatch({
      type: 'GET_BANEO',
      payload: res.data
    })
  }
}

export function sendNoti(email, input) {
  return async dispatch => {
    await axios.put(`http://localhost:3001/notificaciones/add/${email}`, input)
    return dispatch({
      type: 'SEND_NOTI'
    })
  }
}

export function deleteFavorito(email, id) {
  return async dispatch => {
    let dele = await axios.delete(`http://localhost:3001/favoritos/delete/${email}/${id}`)
    return dispatch({
      type: 'DELETE_FAVORITO',
    })
  }
}

export function getNoti(email) {
  return async dispatch => {
    let response = await axios.get(`http://localhost:3001/notificaciones/${email}`)
    return dispatch({
      type: 'GET_NOTI',
      payload: response.data
    })
  }
}

export function desbanear(id, estado) {
  return async dispatch => {
    let desba = await axios.patch(`http://localhost:3001/suspender/${id}/${estado}`)
    return dispatch({
      type: 'DESBANEAR'
    })
  }
}

export function sendEmailNewUser(email) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/email/bienvenida/${email}`)
    return dispatch({
      type: 'EMAIL_NEW_USER',
    })
  }
}

export function sendEmailNewPost(email) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/email/nuevo_post/${email}`)
    return dispatch({
      type: 'EMAIL_NEW_POST',
    })
  }
}

export function sendBaneo(id) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/email/baneo/${id}`)
    return dispatch({
      type: 'EMAIL_BANEO',
    })
  }
}

export function sendDesBaneo(id) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/email/desbaneo/${id}`)
    return dispatch({
      type: 'EMAIL_DESBANEO',
    })
  }
}

export function sendEliminado(id) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/email/eliminarUser/${id}`)
    return dispatch({
      type: 'EMAIL_DELETE_USER',
    })
  }
}

export function reportarPregunta(id) {
  return async dispatch => {
    const repoPreg = await axios.put(`http://localhost:3001/pregunta/reportar/${id}`)
    return dispatch({
      type: 'REPORTAR_PREGUNTA'
    })
  }
}

export function ignorarReportarPregunta(id) {
  return async dispatch => {
   const igRepo = await axios.put(`http://localhost:3001/pregunta/ignorar/${id}`)
    return dispatch({
      type: 'IGNORAR_REPORTAR_PREGUNTA'
    })
  }
}

export function getPreguntasReportadas() {
  return async dispatch => {
    const reportadas = await axios.get("http://localhost:3001/pregunta/reportadas");
    return dispatch({
      type: 'PREGUNTAS_REPORTADAS',
      payload: reportadas.data
    })
  }
}

export function reportarOpinion(id) {
  return async dispatch => {
    const reopinion = await axios.put(`http://localhost:3001/comentario/reportar/${id}`)
    return dispatch({
      type: 'REPORTAR_OPINION'
    })
  }
}

export function ignorarReportarComentario(id) {
  return async dispatch => {
   const igncomments= await axios.put(`http://localhost:3001/comentario/ignorar/${id}`)
    return dispatch({
      type: 'IGNORAR_REPORTAR_OPINION'
    })
  }
}

export function getComentariosReportados() {
  return async dispatch => {
    const opinionesReportadas = await axios.get("http://localhost:3001/comentario/reportadas");
    return dispatch({
      type: 'OPINIONES_REPORTADAS',
      payload: opinionesReportadas.data
    })
  }
}

export function getDestacados() {
  return async function (dispatch) {
    dispatch(loanding());
    try {
      let data = await axios.get(`http://localhost:3001/publicaciones/destacados`);
      return dispatch({ type: "GET_DESTACADOS", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTrabajosPagos(email, idPublicacion) {
  return async function (dispatch) {
    try {
      let data = await axios.get(`http://localhost:3001/trabajos?email=${email}&idPublicacion=${idPublicacion}`);
      return dispatch({ type: "GET_TRABAJOS_PAGOS", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addTrabajosPagos(email, idPublicacion) {
  return async function (dispatch) {
    try {
      let data = await axios.patch(`http://localhost:3001/trabajos/add/${email}/${idPublicacion}`);
      return dispatch({ type: "ADD_TRABAJO_PAGO" });
    } catch (error) {
      console.log(error);
    }
  };
}

export function delTrabajosPagos(id, idPublicacion) {
  return async function (dispatch) {
    try {
      let data = await axios.delete(`http://localhost:3001/trabajos/delete/${id}/${idPublicacion}`);
      return dispatch({ type: "DEL_TRABAJO_PAGO" });
    } catch (error) {
      console.log(error);
    }
  };
}


export function readNoti(email, id) {
  return async dispatch => {
    await axios.put(`http://localhost:3001/notificaciones/delete/${email}/${id}`)
    return dispatch({
      type: 'READ_NOTI'
    })
  }
}
export function getUsersBaneados() {
  return async function (dispatch) {
    try {
      let data = await axios.get(`http://localhost:3001/suspender/Baneados`);
      return dispatch({ type: "USERS_BANEADOS", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsersNoBaneados() {
  return async function (dispatch) {
    try {
      let data = await axios.get(`http://localhost:3001/suspender/noBaneados`);
      return dispatch({ type: "USERS_NO_BANEADOS", payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function SendRes(obj,email){
  return async function (dispatch) {
    try {
      axios.post(`http://localhost:3001/email/respuesta/${email}`,obj);
      return dispatch({ type: "SEND_RES"});
    } catch (error) {
      console.log(error);
    }
  };
}