
const InitialState = {
    Usuarios: []
}


export default function rootReducer(state = InitialState, action) {
switch (action.type){
    
    case 'RENDER':
        return{
            ...state,
            Usuarios: action.payload
        }

    default:
        return state;
}
}

