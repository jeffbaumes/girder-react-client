import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { Responsive } from 'semantic-ui-react';
import ResourceItem from './ResourceItem';

it('renders item name', () => {
  const comp = shallow(<ResourceItem
    name='Foo'
  />);
  expect(comp.find('div').render().text()).toBe('Foo');
});

it('renders item icon', () => {
  const comp = shallow(<ResourceItem
    icon='user'
  />);
  expect(comp.find('div').render().find('i').attr('class')).toMatch('user');
});

it('renders item description', () => {
  const comp = shallow(<ResourceItem
    description='Foo!'
  />);
  expect(comp.find(Responsive).render().text()).toBe('Foo!');
});

it('renders item route url', () => {
  const comp = shallow(<ResourceItem
    url='/user'
  />);
  expect(comp.props()).toMatchObject({as: Link, to: '/user'});
});

it('renders item anchor url', () => {
  const comp = shallow(<ResourceItem
    isRouteLink={false}
    url='https://kitware.com'
  />);
  expect(comp.props()).toMatchObject({as: 'a', href: 'https://kitware.com'});
});
