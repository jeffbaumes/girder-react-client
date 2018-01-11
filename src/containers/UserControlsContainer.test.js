import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mountWithRouterAndStore from '../test/mountWithRouterAndStore';
import mockStore from '../test/mockStore';
import UserControlsContainer from './UserControlsContainer';
import UserControls from '../components/UserControls';
import {
  LOGIN_REQUESTED,
  LOGIN,
  LOGOUT_REQUESTED,
  LOGOUT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
} from '../modules/user';

let mockAxios = new MockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

const storeContent = {
  user: {
    login: null,
    loginModalOpen: false,
    loginErrorMessage: 'error',
  },
};

it('sets correct props', () => {
  mockAxios.onGet().reply(200, {});
  const store = mockStore(storeContent);

  const comp = mountWithRouterAndStore(<UserControlsContainer />, store);
  const props = comp.find(UserControls).props();
  expect(props).toMatchObject({
    login: null,
    loginModalOpen: false,
    loginErrorMessage: 'error',
  });
  expect(typeof props.fetchLoginStatus).toBe('function');
  expect(typeof props.onLogout).toBe('function');
  expect(typeof props.onLogin).toBe('function');
  expect(typeof props.onOpenLoginModal).toBe('function');
  expect(typeof props.onCloseLoginModal).toBe('function');
});

it('calls fetchLoginStatus', done => {
  mockAxios.onGet().reply(200, {});
  const store = mockStore(storeContent);

  const initialized = () => {
    store.clearActions();
    comp.find(UserControls).props().fetchLoginStatus().then(() => {
      expect(store.getActions().map(action => action.type)).toEqual([
        LOGIN,
      ]);
      done();
    });
  };

  const comp = mountWithRouterAndStore(<UserControlsContainer onInitialized={initialized} />, store);
});

it('calls onLogout', done => {
  mockAxios.onAny().reply(200, {});
  const store = mockStore(storeContent);

  const initialized = () => {
    store.clearActions();
    comp.find(UserControls).props().onLogout().then(() => {
      expect(store.getActions().map(action => action.type)).toEqual([
        LOGOUT_REQUESTED,
        LOGOUT,
      ]);
      done();
    });
  };

  const comp = mountWithRouterAndStore(<UserControlsContainer onInitialized={initialized}/>, store);
});

it('calls onLogin', done => {
  mockAxios.onAny().reply(200, {user: {}, authToken: {}});
  const store = mockStore(storeContent);

  const initialized = () => {
    store.clearActions();
    comp.find(UserControls).props().onLogin({username: 'joe', password: 'foo'}).then(() => {
      expect(store.getActions().map(action => action.type)).toEqual([
        LOGIN_REQUESTED,
        LOGIN,
        CLOSE_LOGIN_MODAL,
      ]);
      done();
    });
  };

  const comp = mountWithRouterAndStore(<UserControlsContainer onInitialized={initialized} />, store);
});

it('calls onOpenLoginModal', () => {
  mockAxios.onAny().reply(200, {});
  const store = mockStore(storeContent);
  const comp = mountWithRouterAndStore(<UserControlsContainer />, store);
  expect(comp.find(UserControls).props().onOpenLoginModal().type).toEqual(
    OPEN_LOGIN_MODAL,
  );
});

it('calls onCloseLoginModal', () => {
  mockAxios.onAny().reply(200, {});
  const store = mockStore(storeContent);
  const comp = mountWithRouterAndStore(<UserControlsContainer />, store);
  expect(comp.find(UserControls).props().onCloseLoginModal().type).toEqual(
    CLOSE_LOGIN_MODAL,
  );
});
