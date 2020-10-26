import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './components/register/register';
import Login from './components/register/login';
import { Provider } from 'unstated';
import Home from './components/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>

          <Route exact path = "/" component = {Login}/>

          <Route path = "/register" component = {Register}/>

          <Route path = "/home" component = {Home}/>

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
