// @flow

import * as React from 'react';
import {
  filter,
  isFunction,
  findKey,
  reduce,
  noop,
  mapValues,
} from 'lodash/';
import './form.scss';

import { Button } from 'components';

type Props = {
  loading: boolean,
  children: React.Node,
  buttonText?: string,
  submitHendler?: () => void,
  error?: string,
};

type State = {
  fields: {},
};

class Form extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: 'Submit',
    submitHendler: noop,
    error: null,
  }

  state = {
    fields: reduce(
      filter(this.props.children, elem => isFunction(elem.type)), // eslint-disable-line
      (acc, child) => {
        const elem = child.props.value
          ? child.props.value
          : {
            name: child.props.id,
            value: '',
            error: [],
            passed: false,
          };
        return {
          ...acc,
          [child.props.id]: {
            ...elem,
          },
        };
      },
      {},
    ),
  }

  updateStateHandler = (value) => {
    this.setState(prevState => (
      {
        fields: {
          ...prevState.fields,
          ...value,
        },
      }));
  }

  childrenWithProps = () => {
    const { children } = this.props;
    const { fields } = this.state;
    return React.Children.map(  // eslint-disable-line
      filter(children, elem => isFunction(elem.type)), // TODO: we must get only input feilds
      child => React.cloneElement(
        child,
        {
          updateStateHandler: this.updateStateHandler,
          value: fields[child.props.id],
        },
      ),
    );
  }

  checkFields = () => {
    const { fields } = this.state;
    const result = findKey(fields, field => field.passed === false);
    return !!result;
  }

  onSubmitHendler = (e) => {
    const { submitHendler, loading } = this.props;
    const { fields } = this.state;
    e.preventDefault();
    e.stopPropagation();
    if (loading) {
      return null;
    }
    const formBody = mapValues(fields, obj => obj.value);
    submitHendler(formBody);
    return true;
  }

  render() {
    const { buttonText, loading, error } = this.props;
    if (error) { // TODO: replace by error component
      console.log(error);
    }
    return (
      <form
        className="form"
        onSubmit={this.onSubmitHendler}
      >
        {this.childrenWithProps()}
        <div className="form__submit">
          <Button stretch type="submit" loading={loading} disabled={this.checkFields()}>{buttonText}</Button>
        </div>
      </form>
    );
  }
}

export default Form;
