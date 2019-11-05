import React, { Fragment } from 'react';
import {
  Container,
  Logo,
  Menu,
} from 'components';
import { HomeRouter, SignButtonRouter } from 'routes';

const menuItems = [
  {
    name: 'Projects',
    to: '/projects',
  },
  {
    name: 'API docs',
    to: '/api_docs',
  },
  {
    name: 'Guides',
    to: '/guides',
  },
  {
    name: 'Account',
    to: '/account',
  },
];

const Main = () => (
  <Fragment>
    <Container type="header" color="blue">
      <Logo />
      <Menu
        name={menuItems}
      />
      <SignButtonRouter />
    </Container>
    <HomeRouter />
  </Fragment>
);

export default Main;
export { default as SignOutButton } from './SignOut';
