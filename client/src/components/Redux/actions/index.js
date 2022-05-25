

export function renderWorkers(){
    let workers = [{ name: 'pablo', job: 'gasista'}, { name: 'juan', job: 'plomero' }]
    return { 
    type: 'RENDER',
    payload: workers
    }
}

