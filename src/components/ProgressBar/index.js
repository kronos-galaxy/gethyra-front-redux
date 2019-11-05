// @flow
import React, { Component } from 'react';
import { map } from 'lodash/';
import './progressBar.scss';

type ProgressBarProps = {
  percentage?: Array,
};

class ProgressBar extends Component<ProgressBarProps> {
  static defaultProps = {
    percentage: [],
  };

  Filler = () => {
    const { percentage } = this.props;
    return map(percentage, ({ num, color }) => (
      <div className={`filler filler--${color}`} style={{ width: `${num > 100 ? 100 : num}%` }} />
    ));
  };

  render() {
    return (
      <div className="progress-bar vtoroi">
        {this.Filler()}
      </div>
    );
  }
}

export default ProgressBar;
