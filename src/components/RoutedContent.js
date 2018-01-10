import React from 'react';
import { Route } from 'react-router-dom';

const RoutedContent = ({ routes }) => (
  <div>
    {
      routes.map(route => {
        return <Route key={`/${route.id}`} exact path={`/${route.id}`} component={route.component} />;
      })
    }
  </div>
);

export default RoutedContent;
