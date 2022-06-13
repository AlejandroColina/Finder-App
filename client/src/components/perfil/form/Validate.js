export default function Validate(input){
    const error = {}
    if(!input?.nombres.length){
        error.nombres = 'falta nombres'
    }

    if(!input.apellidos){
        error.apellidos = 'falta apellido'
    }

    if(!input.telefono){
        error.telefono = 'falta el numero de telefono'
    }

    else if((input.telefono.length  <  10)){
        error.telefono = 'numero de telefono invalido'
    }
    if(!input.documento){
        error.documento = 'falta documento'
    }

    if(!input.edad){
        error.edad = 'falta edad'
    }
    return error
}
