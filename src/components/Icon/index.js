// @flow

import React, { PureComponent } from 'react';
import { map } from 'lodash/';
import classnames from 'classnames';

import 'assets/images/icons.svg';
import './icon.scss';

type IconProps = {
  icons?: Array<{ name: string, color?: string }>,
}

class Icon extends PureComponent<IconProps> {
  static defaultProps = {
    icons: [],
  };

  render() {
    const { icons } = this.props;
    return (
      <div className="icon">
        <svg>
          {map(icons, ({ name, color }, indx) => (
            <use
              className={classnames({ [`icon__elem--color--${color}`]: color })}
              key={`${name}-${indx}`}
              xlinkHref={`#icons_${name}`}
            />
          ))}
        </svg>
      </div>
    );
  }
}


export default Icon;
