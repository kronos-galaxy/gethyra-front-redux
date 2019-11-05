// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduce } from 'lodash/';

import {
  Header,
  Input,
  Form,
  Button,
  Container,
  Checkbox,
} from 'components';

import { signUp } from 'store/actions';
import { SetUniqueID } from 'utils';

import './signup.scss';

import TermsAndConditions from './termsAndConditions';

type Fetch = {
  loading: boolean,
  error: string,
};

type Props = {
  handleSignUp: void,
  ids: {
    [string]: string,
  },
  signup?: Fetch
};

type State = {
  agreement: bool,
  body: {},
  readonly: bool,
  step: number,
};

@SetUniqueID(['signup'])
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
    handleSignUp: signUp,
  }, dispatch),
)
class Register extends React.Component<Props, State> {
  static defaultProps = {
    signup: {},
  }

  state = {
    agreement: false,
    body: {},
    readonly: false,
    step: 1,
  };

  getStep = () => {
    const { step } = this.state;
    return (
      <div className="auth__steps text text--light">{`Step ${step} of 2`}</div>
    );
  };

  getCaption = () => {
    const { step } = this.state;
    return (
      <div className="auth__caption text text--size--large">
        {
          step === 1
            ? 'Specify your email address and set password for signing in.'
            : 'Please read and accept Gethyra’s Terms and Conditions.'
        }
      </div>
    );
  };

  getForm = () => {
    const { signup: { loading, error } } = this.props;
    const { readonly } = this.state;
    return (
      <Form
        loading={loading}
        error={error}
        submitHendler={this.savingDataBeforeTerms}
        buttonText="Next — Terms and Conditions"
      >
        <Input
          type="text"
          id="email"
          label="Email"
          caption="We'll send you an email wick activation link"
          autofocus // todo: при минимальном разрешении не должнен срабатывать
          readonly={readonly}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          caption="Password must be at least 8 characters long. Latin letters and numbers. Case sensitive."
          readonly={readonly}
        />
      </Form>
    );
  };

  getConfirm = () => {
    const { agreement } = this.state;
    const { signup: { loading } } = this.props;
    return (
      <div className="confirm">
        <div className="confirm__item">
          <Checkbox
            label="I Accept terms and Conditions"
            changeHandler={this.updateAgreementHandler}
          />
        </div>
        <div className="confirm__item">
          <Button
            loading={loading}
            stretch
            disabled={!agreement}
            onClick={this.registerHandler}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  };

  registerHandler = () => {
    const { ids: { signup: id }, handleSignUp } = this.props;
    const { body } = this.state;
    handleSignUp({ id, body });
  };

  savingDataBeforeTerms = body => this.setState(prevState => ({
    ...prevState,
    body,
    readonly: true,
    step: 2,
  }));

  updateAgreementHandler = () => {
    this.setState(prevState => (
      {
        ...prevState,
        agreement: !prevState.agreement,
      }
    ));
  };

  render() {
    const { step } = this.state;
    return (
      <Container className={`signup signup__step-${step}`}>
        <Header type="h1">
          Sign Up
        </Header>
        {this.getStep()}
        {this.getCaption()}
        {
          step === 1
            ? this.getForm()
            : (
              <React.Fragment>
                <Container className="container--scrollarea">
                  <div className="text text--bold">Terms and Conditions</div>
                  <TermsAndConditions />
                </Container>
                {this.getConfirm()}
              </React.Fragment>
            )
        }
      </Container>
    );
  }
}

export default Register;
