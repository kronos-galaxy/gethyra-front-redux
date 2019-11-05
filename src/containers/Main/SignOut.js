// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from 'store/actions';

import {
  Button,
  Icon,
} from 'components';

type Props = {
  handleSignOut: void,
};

const icons = [{ name: 'sing-out' }];

@connect(
  null,
  dispatch => bindActionCreators({
    handleSignOut: signOut,
  }, dispatch),
)
class SignOutButton extends React.Component<Props> {
  render() {
    const { handleSignOut } = this.props;
    return (
      <Button
        size="square"
        onClick={handleSignOut}
      >
        <Icon icons={icons} />
      </Button>
    );
  }
}

export default SignOutButton;
