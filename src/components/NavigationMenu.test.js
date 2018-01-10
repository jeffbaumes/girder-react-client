import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import NavigationMenu from './NavigationMenu';

it('renders menu item', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'user', name: 'Foo'}]}
    history={{location: {pathname: '/item'}}}
    match={{params: {}}}
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.content).toEqual('Foo');
  expect(itemProps.name).toEqual('user');
  expect(itemProps.to).toEqual('/user');
});

it('is active if location matches', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'user', name: 'Foo'}]}
    history={{location: {pathname: '/user'}}}
    match={{params: {}}}
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.active).toBe(true);
});

it('is not active if location does not match', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'user', name: 'Foo'}]}
    history={{location: {pathname: '/item'}}}
    match={{params: {}}}
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.active).toBe(false);
});

it('is not active if not my-data and is current user', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'user', name: 'Foo'}]}
    history={{location: {pathname: '/user/joe'}}}
    match={{params: {id: 'joe'}}}
    userId='joe'
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.active).toBe(false);
});

it('is active if my-data and is current user', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'my-data', name: 'Foo'}]}
    history={{location: {pathname: '/user/joe'}}}
    match={{params: {id: 'joe'}}}
    userId='joe'
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.active).toBe(true);
  expect(itemProps.to).toEqual('/user/joe');
});

it('links to current search filter', () => {
  const app = shallow(<NavigationMenu
    menuItems={[{id: 'item', name: 'Foo'}]}
    history={{location: {pathname: '/user/search/testquery'}}}
    match={{params: {query: 'testquery'}}}
  />);
  const itemProps = app.find(Menu.Item).props();
  expect(itemProps.to).toEqual('/item/search/testquery');
});
