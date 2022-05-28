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