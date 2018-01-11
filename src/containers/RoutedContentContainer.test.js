import React from 'react';
import mountWithRouterAndStore from '../test/mountWithRouterAndStore';
import mockStore from '../test/mockStore';
import contentRouteMap from '../contentRouteMap';
import RoutedContentContainer from './RoutedContentContainer';
import RoutedContent from '../components/RoutedContent';

it('sets correct props', () => {
  const store = mockStore({main: {contentRoutes: [{id: 'item'}, {id: 'folder'}]}});

  const comp = mountWithRouterAndStore(<RoutedContentContainer />, store);
  const props = comp.find(RoutedContent).props();
  expect(props.routes).toEqual([
    {
      id: 'item',
      component: contentRouteMap.item.component,
    },
    {
      id: 'folder',
      component: contentRouteMap.folder.component,
    }
  ]);
});
