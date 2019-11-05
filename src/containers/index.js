// @flow

import React, { Component } from 'react';

import Main, { SignOutButton } from './Main';
import Auth, { Login, Signup } from './Auth';
import { MainRouter } from '../routes';

class App extends Component {
  render() {
    return <MainRouter />;
  }
}

export {
  Main,
  Auth,
  Login,
  Signup,
  SignOutButton,
  // ...
};

export default App;
