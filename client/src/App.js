import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/index';
import Home from './components/Home/Home';
import Error from './components/Error/index';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route path='/admin' component={Admin}/>
        <Route path='/*' component={Error} />
      </Switch>
    </div>
  );
}

export default App;
