import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import NavigationMenuContainer from './containers/NavigationMenuContainer';
import RoutedContent from './components/RoutedContent';

class App extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        <Switch>
          <Route path='/:type/search/:query' exact component={NavigationMenuContainer} />
          <Route path='/' component={NavigationMenuContainer} />
        </Switch>
        <RoutedContent />
      </div>
    );
  }
}

export default App;
