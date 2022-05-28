import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/index';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Error from './components/Error/index';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path= '/trabajo/:id' component={Detail}/> 
        <Route path='/*' component={Error} /> 
      </Switch>
    </div>
  );
}

export default App;