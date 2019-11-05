// @flow

import React from 'react';
import { reduce } from 'lodash/';

const SetUniqueID = (names: string[]): Function => (WrappedComponent: React.Node): React.Node => {
  class WithID extends React.PureComponent {
    ids = reduce(names, (acc, name) => {
      acc[name] = `${name}-${Math.floor(Math.random() * (10 ** 10))}`;
      return acc;
    }, {});

    render() {
      console.log(this.ids);
      return <WrappedComponent ids={this.ids} {...this.props} />;
    }
  }
  WithID.displayName = `WithID(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithID;
};

export {
  SetUniqueID,
  // ...
};

export default {};
