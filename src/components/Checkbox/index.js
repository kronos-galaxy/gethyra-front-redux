// @flow

import React from 'react';

import './checkbox.scss';

type Props = {
  label?: string,
  changeHandler?: void,
};

class Checkbox extends React.Component<Props> {
  static defaultProps = {
    label: '',
    changeHandler: () => ({}),
  };

  render() {
    const { label, changeHandler } = this.props;
    return (
      <React.Fragment>
        <input type="checkbox" id="checkbox" onChange={changeHandler} />
        <label htmlFor="checkbox">{label}</label>
      </React.Fragment>
    );
  }
}


export default Checkbox;
