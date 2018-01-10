import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import UserControlsContainer from '../containers/UserControlsContainer';
import Search from './Search';

const MainMenu = () => (
  <Menu stackable borderless inverted attached size='massive'>
    <Container>
      <Menu.Item as={Link} to='/' header content='Girder'></Menu.Item>
      <Menu borderless inverted size='large' floated='right'>
        <Switch>
          <Route path='/:type/search/:query' exact component={Search} />
          <Route path='/:type' component={Search} />
        </Switch>
        <UserControlsContainer />
      </Menu>
    </Container>
  </Menu>
);

export default MainMenu;
