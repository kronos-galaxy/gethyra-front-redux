import React from 'react';
import { shallow } from 'enzyme';

import Logo from './index';


describe('<Logo /> component', () => {
  it('<Logo /> should render correctly', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.find('.logo').length).toEqual(1);
  });
});
