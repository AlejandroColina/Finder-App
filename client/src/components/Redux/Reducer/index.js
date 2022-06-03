const InitialState = {
  trabajadores: [],
  users: [], //va a tener todos los usuarios
  detail: [],
  usersByType: [],
  empleos: [],
  empleosForm: [],
  ciudades: [],
  adminMjes: [],
  loanding: false,
};

export default function rootReducer(state = InitialState, action) {
  switch (action.type) {
    case "GET_ADMIN_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "CARDS":
      return {
        ...state,
        trabajadores: action.payload,
        loanding: false,
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

    case 'MSJ_USER_AL_ADMIN':
        return{
            ...state,
        }

    case 'GET_MSJ_ADMIN':
        return{
            ...state,
            adminMjes: action.payload
        }
    case 'LOADER':
        return {
            ...state,
             loanding: true
        }
        case 'DELETE_POST':
          return {
            ...state
          }

    default:
      return state;
  }
}
