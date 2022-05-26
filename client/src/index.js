import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './components/Redux/Store/index'
import { Provider } from 'react-redux';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
  <Auth0Provider 
  domain = "dev-92i1cf9a.eu.auth0.com" 
  clientId="yHnD1sKRvACyYaPctD1doVkhX6hlnnaE" 
  redirectUri={window.location.origin}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
    </Provider>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
