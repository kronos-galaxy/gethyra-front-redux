// @flow

import React, { Component } from 'react';

import {
  Logo,
  Container,
} from 'components';
import { AuthRouter, SignButtonRouter } from '../../routes';

import './auth.scss';

class Auth extends Component {
  render() {
    return (
      <Container type="page">
        <Container type="header" color="blue">
          <Logo />
          <SignButtonRouter />
        </Container>
        <Container type="main" align="center">
          <div className="auth">
            <AuthRouter />
          </div>
        </Container>
      </Container>
    );
  }
}

export default Auth;
export { default as Login } from './Login';
export { default as Signup } from './Signup';
