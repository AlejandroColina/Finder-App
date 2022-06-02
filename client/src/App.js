import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/index';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Error from './components/Error/index';
import Admin from './components/Admin/Admin';
import SecondCap from './components/LandingPage/secondcap/SecondCap';

function App() {

  const [descripcion, setDescripcion] = useState('')

  // useEffect(() => {
    
  
  // }, [])
  

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage descripcion={descripcion} setDescripcion={setDescripcion} />
        </Route>

        <Route exact path='/home'>
          <Home descripcion={descripcion}  setDescripcion={setDescripcion} />
        </Route>
        <Route path='/admin' component={Admin}/>
        <Route path='/quieroseremprendedor' component={SecondCap}/>
        <Route exact path= '/trabajo/:id' component={Detail}/> 
        <Route path='/*' component={Error} /> 
      </Switch>
    </div>
  );
}

export default App;