import axios from 'axios'




export function rederCard(){
    return async function(dispatch){
        try{ 
        let json = await axios.get('http://localhost:3001/users')
        console.log(json.data)
        return dispatch({
            type: 'CARDS',
            payload: json.data
        })
    }catch(error){console.log(error)}
    }
}