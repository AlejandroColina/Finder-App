import axios from 'axios'





export function rederCard(profesion, genero,promedio){
    return async function(dispatch){

        try{ 
        let data = await axios.get(`http://localhost:3001/users?profesion=${profesion}&genero=${genero}&promedio=${promedio}`)
        console.log(data.data)
        return dispatch({
            type: 'CARDS',
            payload: data.data
        })
    }catch(error){console.log(error)}
    }
}

export function getUsers(){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/users');
            return dispatch({
                type: 'GET_ADMIN_USERS',
                payload: json.data
            })
        }catch(error){ console.log(error)}
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