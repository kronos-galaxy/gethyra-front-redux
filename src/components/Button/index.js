// @flow

import * as React from 'react';
import { noop } from 'lodash/';
import classnames from 'classnames';

import { Icon } from 'components';
import './button.scss';

type ButtonProps = {
  children: React.Node,
  size?: '' | 'small' | 'medium',
  color?: string,
  onClick?: () => void,
  type?: string,
  loading?: bool,
  stretch?: bool,
  className?: string,
}

const spinerIcon = [{ name: 'spiner' }];

class Button extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    color: 'default',
    loading: false,
    size: 'default',
    type: 'button',
    onClick: noop,
    stretch: false,
    className: '',
  };

  render() {
    const {
      children,
      size,
      textColor,
      color,
      loading,
      stretch,
      className,
      ...rest
    } = this.props;
    return (
      <button
        type="button"
        {...rest}
        className={classnames(
          'button',
          'text',
          'text--medium',
          className,
          { [`button--size--${size}`]: size },
          { [`button--color--${color}`]: color },
          { 'button--stretch': stretch },

        )}
      >
        { loading ? <Icon icons={spinerIcon} /> : children }
      </button>
    );
  }
}

export default Button;
