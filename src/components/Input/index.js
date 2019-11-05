// @flow

import * as React from 'react';
import cx from 'classnames';
import { has, map } from 'lodash/';

import { Icon } from 'components';
import { Validate } from '../../utils';
import './input.scss';

type Props = {
  type: 'password'|'text',
  id: string,
  caption?: string|null,
  label?: string,
  requared?: bool,
  validate?: bool,
  value?: {
    error: [],
    name: string,
    value: string,
    passed: bool,
  },
  updateStateHandler?: void,
  autofocus?: bool,
  readonly?: bool,
};

type State = {
  showPass: bool,
};

class Input extends React.PureComponent<Props, State> {
  static defaultProps = {
    caption: null,
    label: '',
    requared: false,
    validate: true,
    value: {
      error: [],
      name: '',
      value: '',
      passed: false,
    },
    updateStateHandler: () => ({}),
    autofocus: false,
    readonly: false,
  }

  state = {
    showPass: false,
  }

  onChangeHandle = (event) => {
    const { id, updateStateHandler, validate } = this.props;
    const obj = {
      [id]: {
        name: id,
        value: event.target.value,
        error: [],
        passed: event.target.value !== '',
      },
    };

    if (validate && has(Validate, id)) {
      obj[id] = { ...obj[id], ...Validate[id](event.target.value) };
    }

    updateStateHandler(obj);
  }

  errorWrapper = errors => map(errors, error => (<p key={`error-${error}`}>{error}</p>));

  toggleEye = () => {
    this.setState(prevState => ({ showPass: !prevState.showPass }));
  }

  render() {
    const { showPass } = this.state;
    const {
      type,
      id,
      label,
      caption,
      requared,
      value: {
        value,
        passed,
        error,
      },
      autofocus,
      readonly,
    } = this.props;
    return (
      <div className="input">
        <label
          htmlFor={id}
          className={cx('input__label')}
        >
          <span
            className={cx({ input__label__requared: requared })}
          >
            {label}
          </span>
          <i className="input__success input__success--label">
            { passed && <Icon icons={[{ name: 'check', color: 'blue' }]} /> }
          </i>
        </label>
        <div className="input__container">
          <input
            className={cx('input__field', { 'input__field--error': !!error.length })}
            id={id}
            type={showPass ? 'text' : type}
            value={value}
            onChange={this.onChangeHandle}
            autoFocus={autofocus}
            readOnly={readonly}
          />
          <i className="input__success input__success--input text text--size--large">
            { passed && (
              <Icon icons={[{ name: 'circle' }, { name: 'check-circle' }]} />
            )}
          </i>
          { type === 'password' && (
            <i className="input__eye text text--grey" onClick={this.toggleEye}>
              <Icon icons={[{ name: showPass ? 'eye-closed' : 'eye' }]} />
            </i>
          ) }
          { !!error.length && <div className="input__error text text--red">{this.errorWrapper(error)}</div> }
        </div>
        {caption && <div className="input__caption text text--grey">{caption}</div>}
      </div>
    );
  }
}

export default Input;
