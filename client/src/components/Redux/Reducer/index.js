const InitialState = {
    trabajadores: [],
    detail: []
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){   

         
 
    case 'CARDS':
     return{
         ...state,
         trabajadores: action.payload
     }

     case 'DETAIL':
        return {
            ...state,
            detail: action.payload
        }

    default:
        return state;
}
}

