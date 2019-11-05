import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Link, Button } from '../components';

import { SignOutButton } from '../containers';

export const SignButtonRouter = () => (
  <Switch>
    <Route exact path="/auth(|/signin)" component={SignInButton} />
    <Route exact path="/auth/signup" component={SignUpButton} />
    <Route path="/" component={SignOutButton} />
  </Switch>
);

const SignInButton = () => (
  <Link to="/auth/signup" underline={false}>
    <Button color="auth">Sign Up</Button>
  </Link>
);

const SignUpButton = () => (
  <Link to="/auth/signin" underline={false}>
    <Button color="auth">Sign In</Button>
  </Link>
);
