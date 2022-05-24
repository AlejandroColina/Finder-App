

export function render(payload){
    console.log(payload);
    return { 
    type: 'RENDER',
    payload: payload,
}
}