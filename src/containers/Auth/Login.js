// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduce } from 'lodash/';

import { signIn } from 'store/actions';
import { SetUniqueID } from 'utils';

import {
  Header,
  Input,
  Form,
  Container,
  Link,
} from 'components';

import './signin.scss';

type Fetch = {
  loading: boolean,
  error: string,
};

type Props = {
  ids: {
    [string]: string,
  },
  signInHendler: void,
  signin?: Fetch,
};

@SetUniqueID(['signin'])
@connect(
  (store, { ids }) => {
    const fetches = reduce(ids, (acc, value, key) => {
      acc[key] = store.fetches.get('byId').get(value);
      return acc;
    }, {});
    return {
      // this u can put any other store data
      ...fetches,
    };
  },
  dispatch => bindActionCreators({
    signInHendler: signIn,
  }, dispatch),
)
class Login extends React.Component<Props> {
  static defaultProps = {
    signin: {},
  }

  formSubmitHendler = (body) => {
    const { ids: { signin: id }, signInHendler } = this.props;
    signInHendler({ id, body });
  }

  render() {
    console.log(this.props);
    const { signin: { loading, error } } = this.props;
    return (
      <div className="signin">
        <Header type="h1">
          Sign In
        </Header>
        <div className="auth__caption text text--size--large">
          Great to see you again!
        </div>
        <Form
          loading={loading}
          error={error}
          submitHendler={this.formSubmitHendler}
          buttonText="Sign In"
        >
          <Input
            type="text"
            id="email"
            label="Email"
          />
          <Input
            type="password"
            id="password"
            label="Password"
            validate={false}
          />
        </Form>
        <Container className="signin__rsp-link">
          <Link to="/auth/resetpassword" textStyle="text--blue text--align--center">
            Reset password
          </Link>
        </Container>
      </div>
    );
  }
}

export default Login;
