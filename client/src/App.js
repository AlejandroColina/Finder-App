import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/index';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Error from './components/Error/index';
import Admin from './components/Admin/Admin';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function App() {

  const [descripcion, setDescripcion] = useState('')

  
  return (
    <PayPalScriptProvider options={{ "client-id": "Aap4jadH7cd-dUPZ0_VDpphpU312qOG2pZihjsiNVszEuX1skS15JjLcgJ68g6uiP-a-B05RNSHnEy2_" }}>
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage descripcion={descripcion} setDescripcion={setDescripcion} />
        </Route>
        <Route exact path='/home'>
          <Home descripcion={descripcion}  setDescripcion={setDescripcion} />
        </Route>
        <Route path='/admin' component={Admin}/>
        <Route exact path= '/trabajo/:id' component={Detail}/> 
        <Route path='/*' component={Error} /> 
      </Switch>
    </div>
    </PayPalScriptProvider>
  );
}

export default App;