import React from 'react';
import { shallow } from 'enzyme';
import bindProps from './bindProps';

const A = () => <div />;

it('creates a component with bound props', () => {
  const B = bindProps(A, {prop1: 10});
  const b = shallow(<B />);

  expect(b.props().prop1).toBe(10);
});

it('will allow override of bound props', () => {
  const B = bindProps(A, {prop1: 10});
  const b = shallow(<B prop1={20}/>);

  expect(b.props().prop1).toBe(20);
});
