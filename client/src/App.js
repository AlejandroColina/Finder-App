import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/index';
import Home from './components/Home/index';
import Error from './components/Error/index';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route path='/*' component={Error} />
      </Switch>
    </div>
  );
}

export default App;
