import React from 'react';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import {
  Auth,
  Main,
  Login,
  Signup,
  // ...
} from '../containers';

export const MainRouter = () => (
  <Switch>
    <PrivateRoute path="/auth" component={Auth} />
    <PrivateRoute path="/" component={Main} />
  </Switch>
);

export const AuthRouter = () => (
  <Switch>
    <Route exact path="/auth(|/signin)" component={Login} />
    <Route exact path="/auth/signup" component={Signup} />
  </Switch>
);

export const HomeRouter = () => (
  <Switch>
    <Route exact path="/" render={() => <div>Home</div>} />
    <Route exact path="/projects" render={() => <div>Project</div>} />
    <Route exact path="/settings" render={() => <div>Settings</div>} />
  </Switch>
);

@connect(
  store => ({ token: store.token.get('key') }),
)
class PrivateRoute extends React.Component {
  getResult = (props) => {
    const { component: Component, token, path } = this.props; // eslint-disable-line
    if (token) {
      if (/^\/auth.*/.test(path)) {
        let target = {};
        try {
          target = props.location.state.from;
        } catch (err) {
          target = { pathname: '/', state: { from: props.location } };
        }
        return (<Redirect to={target} />);
      }
      return (<Component {...props} />);
    }
    if (!/^\/auth.*/.test(path)) {
      return (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
    }
    return (<Component {...props} />);
  }

  render() {
    const { component: Component, isAuth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        component={this.getResult}
      />
    );
  }
}

export { SignButtonRouter } from './AuthButton';
