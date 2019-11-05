// @flow

import * as React from 'react';
import cx from 'classnames';

import './text.scss';

type Props = {
  children: React.Node,
  type?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
  size?: string,
  align?: string,
  color?: string,
}

class Text extends React.PureComponent<Props> {
  static defaultProps = {
    type: '',
    size: '',
    align: '',
    color: '',
  };

  render() {
    const {
      children,
      type,
      size,
      align,
      color,
    } = this.props;
    return (
      <div
        className={cx(
          'text',
          { [`text--${type}`]: type },
          { [`text--size--${size}`]: size },
          { [`text--align--${align}`]: align },
          { [`text--color--${color}`]: color },
        )}
      >
        {children}
      </div>
    );
  }
}

export default Text;
