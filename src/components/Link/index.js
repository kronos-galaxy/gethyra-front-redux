// @flow

import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import './link.scss';

type Props = {
  children?: React.Node|undefined,
  textStyle?: string,
  to: string,
  underline?: bool,
};

export default class extends React.Component<Props> {
  static defaultProps = {
    textStyle: '',
    underline: true,
    children: undefined,
  }

  render() {
    const {
      children,
      textStyle,
      to,
      underline,
      ...rest
    } = this.props;

    return (
      <Link
        {...rest}
        to={to}
        className={cx(
          'link',
          textStyle,
        )}
      >
        { children }
        { underline && <p className="link__underline" /> }
      </Link>
    );
  }
}
