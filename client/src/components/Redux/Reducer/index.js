const InitialState = {
    trabajadores: [],
    detail: [],
    empleos: [],
    ciudades: []
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


    default:
        return state;
}
}

