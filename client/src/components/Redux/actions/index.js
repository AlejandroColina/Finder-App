import axios from 'axios'

export function renderWorkers(){
    let workers = [{ name: 'pablo', job: 'gasista'}, { name: 'juan', job: 'plomero' }]
    return { 
    type: 'RENDER',
    payload: workers
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
    }
}