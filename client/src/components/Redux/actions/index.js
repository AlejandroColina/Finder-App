import axios from 'axios'





export function rederCard(profesion, genero,promedio, ciudad){
    return async function(dispatch){

        try{ 
        let data = await axios.get(`http://localhost:3001/users?profesion=${profesion}&genero=${genero}&promedio=${promedio}&ciudad=${ciudad}`)
        console.log(data.data)
        return dispatch({
            type: 'CARDS',
            payload: data.data
        })
    }catch(error){console.log(error)}
    }
}

export function getDetail(id) {
    return async function (dispatch) {        
            var json = await axios.get("http://localhost:3001/users/trabajo/" + id);
            return dispatch({
                type: 'DETAIL',
                payload: json.data
            })
    }

}


export const getEmpleos = () => {

    let url = 'http://localhost:3001/users/empleos'

    return async(dispatch) =>{
        const resp = await axios.get(url)
        return dispatch({
            type: 'GET_EMPLEOS',
            payload: resp.data
        })
    }

}
export const getCiudades = () => {

    let url = 'http://localhost:3001/users/ciudades'

    return async(dispatch) =>{
        const resp = await axios.get(url)
        return dispatch({
            type: 'GET_CIUDADES',
            payload: resp.data
        })
    }

}