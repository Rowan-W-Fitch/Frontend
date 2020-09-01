import React from 'react';
import { Switch } from 'react-router-dom';

import { Register } from '../components/register/register';
import { Login } from '../components/register/login';
import { Home } from '../components/home/home';
import Route from "./Routes";

export default function Routes(){
  return(
    <Switch>
      <Route path = "/" exact component = {Login} />
      <Route path = "/register" component = {Register} />
      <Route path = "/home" component = {Home}  isPrivate />
      <Route component = {Login} />
    </Switch>
  );
}
