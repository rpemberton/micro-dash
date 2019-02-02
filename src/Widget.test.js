import React from 'react';
import { shallow } from 'enzyme';
import Widget from './Widget';

describe('<Widget />', () => {
  it('renders children', () => {
    const wrapper = shallow(<Widget>Child</Widget>);
    expect(wrapper.text()).toBe('Child');
  });
});
