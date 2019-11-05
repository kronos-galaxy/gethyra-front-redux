// @flow

import * as React from 'react';
import cx from 'classnames';

import './header.scss';

type Props = {
  children: React.Node,
  type?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
}

class Header extends React.Component<Props> {
  static defaultProps = {
    type: 'h1',
  }

  render() {
    const { children, type } = this.props;
    return (
      <div
        className={cx(
          'header',
          { [`header--${type}`]: type },
        )}
      >
        {children}
      </div>
    );
  }
}

export default Header;
