import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import MainMenu from './MainMenu';

it('renders correct components', () => {
  const app = shallow(<MainMenu />);
  expect(app.find(Menu.Item).props().content).toEqual('Girder');
});
