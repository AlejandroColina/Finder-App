const InitialState = {
    trabajadores: [],
    users:[], //va a tener todos los usuarios
    detail: [],
    usersByType:[],
    detail: [],
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
        let prev = state.adminMjes
        let objMsj ={[action.payload[0]]:action.payload[1]}
        prev.push(objMsj)
        return{
            ...state,
        }

    default:
        return state;
}
}

