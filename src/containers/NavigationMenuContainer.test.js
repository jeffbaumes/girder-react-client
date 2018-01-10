import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import NavigationMenuContainer from './NavigationMenuContainer';
import NavigationMenu from '../components/NavigationMenu';

const menuItems = [
  {id: 'a', name: 'for everyone'},
  {id: 'b', name: 'for logged in users', requiresLogin: true},
  {id: 'c', name: 'for admins only', requiresAdmin: true},
];

const mountWithRouterAndStore = (component, store) => {
  return mount(<Provider store={store}><Router>{component}</Router></Provider>);
};

it('converts state to props correctly with no user', () => {
  const store = createMockStore({
    user: {id: null},
    main: {menuItems},
  });
  const comp = mountWithRouterAndStore(<NavigationMenuContainer/>, store);
  expect(comp.find(NavigationMenu).props()).toMatchObject({
    userId: null,
    menuItems: [menuItems[0]],
  });
});

it('converts state to props correctly with non-admin user', () => {
  const store = createMockStore({
    user: {id: 'joe'},
    main: {menuItems},
  });
  const comp = mountWithRouterAndStore(<NavigationMenuContainer/>, store);
  expect(comp.find(NavigationMenu).props()).toMatchObject({
    userId: 'joe',
    menuItems: [menuItems[0], menuItems[1]],
  });
});

it('converts state to props correctly with admin user', () => {
  const store = createMockStore({
    user: {id: 'admin', admin: true},
    main: {menuItems},
  });
  const comp = mountWithRouterAndStore(<NavigationMenuContainer/>, store);
  expect(comp.find(NavigationMenu).props()).toMatchObject({
    userId: 'admin',
    menuItems,
  });
});
