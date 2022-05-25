

const InitialState = {
    trabajadores: []
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){
    
    case 'RENDER':
        return{
            ...state,
            trabajadores: action.payload
        }
    

    default:
        return state;
}
}

