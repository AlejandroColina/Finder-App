

const InitialState = {
    trabajadores: []
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){
    
 
     case 'CARDS':
     return{
         ...state,
         trabajadores: action.payload
     }
    default:
        return state;
}
}

