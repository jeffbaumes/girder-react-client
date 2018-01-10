import React from 'react';
import { shallow } from 'enzyme';
import AnyResourceItem from './AnyResourceItem';
import resources from '../resources';

Object.keys(resources).forEach((type) => {
  it(`should render the correct component for ${type}`, () => {
    const comp = shallow(<AnyResourceItem resource={{type}} />);
    expect(comp.first().type()).toEqual(resources[type].item);
  });
});
