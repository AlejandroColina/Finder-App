
import React, { useState } from "react";
import { BrowserRouter as Switch, Redirect, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/index";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/index";
import Admin from "./components/Admin/Admin";
import UserCreate from "./components/UserCreate/UserCreate/UserCreate";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CustomerCreate from "./components/UserCreate/CustomerCreate/CustomerCreate";
import Perfil from './components/perfil/Perfil'
import SecondCap from './components/LandingPage/secondcap/SecondCap';
import ContainerChat from "./components/Chat/ContainerChat";
import Chat from "./components/Chat/Chat";
import firebase from 'firebase/compat/app';
import "firebase/database";
import "firebase/auth";
import Prueba from "./components/Chat/Prueba";

const firebaseConfig = {
  apiKey: "AIzaSyD0gA7bouQascjjCbbWBN57QNE1vAwx6Mg",
  authDomain: "chat-app97.firebaseapp.com",
  projectId: "chat-app97",
  storageBucket: "chat-app97.appspot.com",
  messagingSenderId: "1073937472",
  appId: "1:1073937472:web:4ccb3dc42f6a496081b3a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [descripcion, setDescripcion] = useState("");

  
  return (
    <div className="App">
        <PayPalScriptProvider
          options={{
            "client-id":
              "Aap4jadH7cd-dUPZ0_VDpphpU312qOG2pZihjsiNVszEuX1skS15JjLcgJ68g6uiP-a-B05RNSHnEy2_",
          }}
        >
        <Switch>
          <Route exact path="/">
            <LandingPage
              descripcion={descripcion}
              setDescripcion={setDescripcion}
            />
          </Route>
          <Route exact path="/home">
            <Home descripcion={descripcion} setDescripcion={setDescripcion} />
          </Route>
          <Route path="/userLog" component={UserCreate} />
          <Route path="/customerLog" component={CustomerCreate} />
          <Route path="/admin" component={Admin} />
          <Route path='/quieroseremprendedor' component={SecondCap}/>
          <Route exact path="/trabajo/:id" component={Detail} />
          <Route path="/perfil/:email" component={Perfil}/>
          <Route path='/chat' component={ContainerChat}/>
          <Route exact path="/chat/:name" component={Chat} />
         
          {/* <Route path='*' component={Error} /> */}

         
          
        </Switch>
    </PayPalScriptProvider>
      </div>
  );
}

export default App;
