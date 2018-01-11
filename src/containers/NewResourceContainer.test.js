import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mountWithRouterAndStore from '../test/mountWithRouterAndStore';
import mockStore from '../test/mockStore';
import NewResourceContainer from './NewResourceContainer';
import NewResource from '../components/NewResource';
import { OPEN_MODAL, CLOSE_MODAL } from '../modules/modal';
import { ADD_CHILD } from '../modules/focusedResource';

let mockAxios = new MockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

it('sets function props', () => {
  const store = mockStore({
    modal: {openModal: null},
  });
  const comp = mountWithRouterAndStore(<NewResourceContainer type='item' />, store);
  const props = comp.find(NewResource).props();
  expect(typeof props.onOpen).toBe('function');
  expect(typeof props.onClose).toBe('function');
  expect(typeof props.create).toBe('function');
});

it('sets modalOpen correctly to true', () => {
  const store = mockStore({
    modal: {openModal: 'new-item'},
  });
  const comp = mountWithRouterAndStore(<NewResourceContainer type='item' />, store);
  expect(comp.find(NewResource).props().modalOpen).toBe(true);
});

it('sets modalOpen correctly to false', () => {
  const store = mockStore({
    modal: {openModal: 'new-item'},
  });
  const comp = mountWithRouterAndStore(<NewResourceContainer type='user' />, store);
  expect(comp.find(NewResource).props().modalOpen).toBe(false);
});

it('dispatches openModal', () => {
  const store = mockStore({
    modal: {openModal: null},
  });
  const comp = mountWithRouterAndStore(<NewResourceContainer type='folder' />, store);
  comp.find(NewResource).props().onOpen();
  expect(store.getActions()).toEqual([{
    type: OPEN_MODAL,
    modalName: 'new-folder',
  }]);
});

it('dispatches closeModal', () => {
  const store = mockStore({
    modal: {openModal: null},
  });
  const comp = mountWithRouterAndStore(<NewResourceContainer type='folder' />, store);
  comp.find(NewResource).props().onClose();
  expect(store.getActions()).toEqual([{
    type: CLOSE_MODAL,
  }]);
});

it('dispatches createChild and closeModal', done => {
  const store = mockStore({
    modal: {openModal: null},
  });

  mockAxios.onPost('/item').reply(200, {_id: 'newitem', _modelType: 'item'});

  const comp = mountWithRouterAndStore(<NewResourceContainer type='item' />, store);
  comp.find(NewResource).props().create({folderId: 'i', name: 'n', description: 'd'}).then(() => {
    expect(store.getActions()).toEqual([
      {
        type: ADD_CHILD,
        resource: {id: 'newitem', type: 'item', name: undefined, description: undefined},
      },
      {
        type: CLOSE_MODAL,
      },
    ]);
    done();
  });
});
