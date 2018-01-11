import React from 'react';
import mockStore from '../test/mockStore';
import mountWithRouterAndStore from '../test/mountWithRouterAndStore';
import NavigationMenuContainer from './NavigationMenuContainer';
import NavigationMenu from '../components/NavigationMenu';

const menuItems = [
  {id: 'a', name: 'for everyone'},
  {id: 'b', name: 'for logged in users', requiresLogin: true},
  {id: 'c', name: 'for admins only', requiresAdmin: true},
];

it('converts state to props correctly with no user', () => {
  const store = mockStore({
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
  const store = mockStore({
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
  const store = mockStore({
    user: {id: 'admin', admin: true},
    main: {menuItems},
  });
  const comp = mountWithRouterAndStore(<NavigationMenuContainer/>, store);
  expect(comp.find(NavigationMenu).props()).toMatchObject({
    userId: 'admin',
    menuItems,
  });
});
