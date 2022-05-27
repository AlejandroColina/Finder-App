

const InitialState = {
    trabajadores: [],
    detail: []
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){
    
<<<<<<< HEAD
    case 'RENDER':
        return{
            ...state,
            trabajadores: action.payload
        }

    case 'DETAIL':
        return {
            ...state,
            detail: action.payload
        }     
    

=======
 
     case 'CARDS':
     return{
         ...state,
         trabajadores: action.payload
     }
>>>>>>> cef0be2617a0e5564b4d49c31611fe328a8ebce5
    default:
        return state;
}
}

