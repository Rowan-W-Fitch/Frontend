import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Register, Login } from './components/register/index';
import { Home } from './components/home/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path = "/" component = {Login}/>

        <Route path = "/register" component = {Register}/>
        /*
        <Route path = "/get_spots" >
        </Route>
        */

        <Route path = "/home" component = {Home}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
