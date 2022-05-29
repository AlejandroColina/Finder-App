const InitialState = {
    trabajadores: [],
    users:[], //va a tener todos los usuarios
    detail: [],
    usersByType:[]
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

    case 'USER_BY_TYPES':
        return{
            ...state,
            usersByType: action.payload
        }

    default:
        return state;
}
}

