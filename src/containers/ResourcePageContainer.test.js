import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mountWithRouterAndStore from '../test/mountWithRouterAndStore';
import mockStore from '../test/mockStore';
import ResourcePageContainer from './ResourcePageContainer';
import ResourcePage from '../pages/ResourcePage';
import { REFOCUS_REQUESTED, REFOCUS } from '../modules/focusedResource';

let mockAxios = new MockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

const storeContent = {
  focusedResource: {
    resource: {
      id: 'me',
      type: 'item',
      name: 'n',
      description: 'd',
    },
    children: [{id: 'child', type: 'item'}],
    rootPath: [{id: 'parent', type: 'folder'}, {id: 'me', type: 'item'}],
  },
  modal: {openModal: null},
};

it('sets correct props', () => {
  mockAxios.onGet().reply(200, {});
  const store = mockStore(storeContent);

  const comp = mountWithRouterAndStore(<ResourcePageContainer resource={storeContent.focusedResource} />, store, '/item/me');
  const props = comp.find(ResourcePage).props();
  expect(props).toMatchObject({
    resource: storeContent.focusedResource.resource,
    breadcrumbs: storeContent.focusedResource.rootPath,
    children: storeContent.focusedResource.children,
  });
  expect(typeof props.fetch).toBe('function');
});

it('calls fetch', done => {
  mockAxios.onGet().reply(200, {});
  const store = mockStore(storeContent);

  const comp = mountWithRouterAndStore(<ResourcePageContainer resource={storeContent.focusedResource} />, store, '/item/me');
  comp.find(ResourcePage).props().fetch({folderId: 'i', name: 'n', description: 'd'}).then(() => {
    // There are two sets of actions: one happens in componentDidMount of ResourcePage
    // (which we do not have the access to the promise of), and one that is called here.
    expect(store.getActions()).toMatchObject([
      {
        type: REFOCUS_REQUESTED,
      },
      {
        type: REFOCUS_REQUESTED,
      },
      {
        type: REFOCUS,
      },
      {
        type: REFOCUS,
      },
    ]);
    done();
  });
});
