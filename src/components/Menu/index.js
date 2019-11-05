// @flow

import React from 'react';
import { map } from 'lodash/';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Container from '../Container';
import Link from '../Link';

type MenuProps = {
  name: Array<{ name: string, to: string }>,
  location: { pathname: string },
}

class Menu extends React.PureComponent<MenuProps> {
  render() {
    const { name, location } = this.props;
    return (
      <Container type="menu">
        {map(name, (e, index) => (
          <Link
            key={e.name}
            to={`${e.to}`}
            underline={false}
            textStyle={
              classnames('text text--semi-bold', { 'text--transparent': location.pathname !== e.to })
            }
          >
            {e.name}
          </Link>
        ))
        }
      </Container>
    );
  }
}

export default withRouter(Menu);
