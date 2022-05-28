

const InitialState = {
    trabajadores: [],
    users:[], //va a tener todos los usuarios
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
    default:
        return state;
}
}

