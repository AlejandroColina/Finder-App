import axios from 'axios'
<<<<<<< HEAD
=======

>>>>>>> cef0be2617a0e5564b4d49c31611fe328a8ebce5



export function rederCard(){
    return async function(dispatch){
        try{ 
        let data = await axios.get('http://localhost:3001/users')
        console.log(data.data)
        return dispatch({
            type: 'CARDS',
            payload: data.data
        })
    }catch(error){console.log(error)}
    }
<<<<<<< HEAD
}

export function getDetail(id) {
    return async function (dispatch) {
        
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
    }
=======
>>>>>>> cef0be2617a0e5564b4d49c31611fe328a8ebce5
}