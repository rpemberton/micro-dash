import React from 'react';
import { shallow } from 'enzyme';
import Meter from './Meter';

describe('<Meter />', () => {
  const meterData = {
    value: 34,
    min: 0,
    max: 200,
    format: 'currency',
    unit: 'GBP'
  };

  it('renders the correct value', () => {
    const wrapper = shallow(<Meter data={meterData} />);
    expect(
      wrapper.containsMatchingElement(<div className='Meter__val'>£34</div>)
    ).toBeTruthy();
  });

  it('displays a loading sign', () => {
    const wrapper = shallow(<Meter data={null} />);
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBeTruthy();
  });

  it('displays an error message', () => {
    const wrapper = shallow(<Meter data={{ error: true }} />);
    expect(wrapper.find('.Meter__info').text()).toEqual(
      'Error. Try refreshing.'
    );
  });

  it('rotates the arc by the correct degrees', () => {
    const wrapper = shallow(<Meter data={meterData} />);
    expect(wrapper.find('.Meter__arc').prop('style')).toHaveProperty(
      'transform',
      'rotate(-45deg) rotate(31deg)'
    );
  });

  it('rotates the needle by the correct degrees', () => {
    const wrapper = shallow(<Meter data={meterData} />);
    expect(wrapper.find('.Meter__needle').prop('style')).toHaveProperty(
      'transform',
      'rotate(-90deg) rotate(31deg)'
    );
  });
});
