import React from 'react';
import { shallow } from 'enzyme';
import { Switch } from 'react-router-dom';
import App from './App';
import MainMenu from './components/MainMenu';
import RoutedContentContainer from './containers/RoutedContentContainer';

it('renders correct components', () => {
  const app = shallow(<App />);
  expect(app.children().map(c => c.type())).toEqual([
    MainMenu,
    Switch,
    RoutedContentContainer,
  ]);
});
