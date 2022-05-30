const InitialState = {
    trabajadores: [],
    users:[], //va a tener todos los usuarios
    detail: [],
    usersByType:[],
    empleos: [],
    ciudades: [],
    adminMjes:[]
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){   

         
 
    case 'CARDS':
     return{
         ...state,
         trabajadores: action.payload
     }
     case 'GET_ADMIN_USERS':
         return{
            ...state,
            users: action.payload
         }

     case 'DETAIL':
        return {
            ...state,
            detail: action.payload
        }
    case "GET_DELETE":
        return{
            ...state,
            detail: []
        }     
     case 'GET_EMPLEOS':
         return{
             ...state,
             empleos: action.payload
         }

     case 'GET_CIUDADES':
         return{
             ...state,
             ciudades : action.payload
         }


    case 'USER_BY_TYPES':
        return{
            ...state,
            usersByType: action.payload
        }

    case 'USER_MSJ':
        let prev = state.adminMjes;
        prev.push(action.payload)
        return{
            ...state,
            adminMjes:prev
        }

    default:
        return state;
}
}

