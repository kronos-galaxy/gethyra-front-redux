// @flow

import * as React from 'react';
import cx from 'classnames';

import './container.scss';

type Props = {
  type?: 'header'|'page'|'content'|'main',
  align?: 'center'|null,
  children: React.Node,
  color?: 'grey'|null,
  className?: string,
}

class Container extends React.Component<Props> {
  static defaultProps = {
    align: null,
    color: null,
    type: 'content',
    className: '',
  }

  render() {
    const {
      children,
      color,
      type,
      align,
      className,
    } = this.props;
    return (
      <div
        className={cx(
          'container',
          { [`container--align--${align}`]: align },
          { [`container--color--${color}`]: color },
          { [`container--${type}`]: type },
          className,
        )}
      >
        {children}
      </div>
    );
  }
}

export default Container;
