const InitialState = {
  trabajadores: [],
  users: [], //va a tener todos los usuarios
  detail: [],
  usersByType: [],
  empleos: [],
  empleosForm: [],
  ciudades: [],
  adminMjes: [],
  loanding: true,
  msjDetailAdmin: {},
  ubicacion: {},
  validar: true,
  perfil: [],
  opiniones: [],
  preguntas: [],
  info: [],
  favorito: [],
  baneado: false,
  notificaciones:[],
  usuariosBaneados:[],
  noBaneados:[],
  preguntasReportadas:[],
  opinionesReportadas:[],

};

export default function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case "GET_ADMIN_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "CARDS":
      if(state.loanding === false){
        console.log('Loanding Ya esta false')
        return{
          ...state,
          trabajadores: action.payload
        }
      }else{
        console.log('seteado a FALSE')
        return {
          ...state,
          trabajadores: action.payload,
          loanding: false,
        };
      }

    case "CARDST":
      return {
        ...state,
        info: action.payload,
      };

    case "DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_DELETE":
      return {
        ...state,
        detail: [],
      };
    case "GET_EMPLEOS":
      return {
        ...state,
        empleos: action.payload,
      };

    case "GET_EMPLEOS_FORM":
      return {
        ...state,
        empleosForm: action.payload,
      };

    case "GET_CIUDADES":
      return {
        ...state,
        ciudades: action.payload,
      };

    case "USER_BY_TYPES":
      return {
        ...state,
        usersByType: action.payload,
      };

    case "MSJ_USER_AL_ADMIN":
      return {
        ...state,
      };

    case "GET_MSJ_ADMIN":
      return {
        ...state,
        adminMjes: action.payload,
      };
    case "LOADER":
      return {
        ...state,
        loanding: true,
      };
    case "DELETE_POST":
      return {
        ...state,
      };

    case "READ_MSJ_ADMIN":
      return {
        ...state,
        msjDetailAdmin: action.payload,
      };

    case "OPEN_MSJ_ADMIN":
      return {
        ...state,
      };

    case "UBICACION":
      return {
        ...state,
        ubicacion: action.payload,
      };
    case "GET_PERFIL":
      return {
        ...state,
        perfil: action.payload,
      };

    case "INFO_VALI":
      return {
        ...state,
        validar: action.payload,
      };

    case "MODIFICAR":
      return {
        ...state,
      };

    case "DELETE":
      return {
        ...state,
      };


    case 'GET_OPINIONES':
      return {
        ...state,
        opiniones: action.payload
      }
    case 'POST_OPINION':
      return {
        ...state,
      }
    case 'DELETE_OPINION':
      return {
        ...state,
      }

    case 'GET_PREGUNTAS':
      return {
        ...state,
        preguntas: action.payload
      }
    case 'POST_PREGUNTA':
      return {
        ...state,
      }
    case 'DELETE_PREGUNTA':
      return {
        ...state,
      }
    case 'RESPONDER_PREGUNTA':
      return {
        ...state,
      }
    case 'FAVORITO':
      return {
        ...state,
        favorito: action.payload
      }
    case 'DELETE_USER':
      return {
        ...state,
      }
    case 'BANEAR':
      return {
        ...state,
      }
    case 'GET_BANEO':
      return {
        ...state,
        baneado: action.payload
      }

      case 'DESBANEAR':
        return {
          ...state
        }

    case 'SEND_NOTI':
      return {
        ...state
      }
    case ' DELETE_FAVORITO':
      return {
        ...state,
      }
    case 'EMAIL_NEW_POST':
      return {
        ...state,
      }
    case 'EMAIL_NEW_USER':
      return {
        ...state,
      }
    case 'EMAIL_BANEO':
      return {
        ...state,
      }
    
    case 'EMAIL_DESBANEO':
      return {
        ...state,
      }
    case 'EMAIL_DELETE_USER':
      return {
        ...state,
      }


    case 'GET_NOTI':
      return{
        ...state,
        notificaciones: action.payload
      }

    case 'USER_STATUS':
      return{
        ...state,
        noBaneados: state.users.filter(u=>u.baneado===false),
        usuariosBaneados: state.users.filter(u=>u.baneado===true),
      }

      case 'REPORTAR_PREGUNTA':
        return{
          ...state
        }
  
      case 'IGNORAR_REPORTAR_PREGUNTA':
        return{
          ...state
        }
      
      case 'PREGUNTAS_REPORTADAS':
        return{
          ...state,
          preguntasReportadas:action.payload
        }

        case 'REPORTAR_OPINION':
          return{
            ...state
          }
    
        case 'IGNORAR_REPORTAR_OPINION':
          return{
            ...state
          }
        
        case 'OPINIONES_REPORTADAS':
          return{
            ...state,
            opinionesReportadas:action.payload
          } 

    default:
      return state;
  }
}
