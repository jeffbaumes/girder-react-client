import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import mockStore from '../test/mockStore';
import reducer, * as actions from './focusedResource';

const startState = {
  resource: {
    id: 'i',
    name: 'n',
    description: 'd',
    type: 'item',
  },
  children: [{id: 'child1'}],
  rootPath: [],
  isLoadingChildren: false,
  isUpdating: false,
};

let mockAxios = new MockAdapter(axios);

afterEach(() => {
  mockAxios.reset();
});

it('does REFOCUS_REQUESTED correctly', () => {
  expect(reducer(startState, {type: actions.REFOCUS_REQUESTED})).toEqual({
    resource: {
      id: null,
      name: '',
      description: '',
      type: null,
    },
    children: [],
    rootPath: [],
    isLoadingChildren: false,
    isUpdating: true,
  });
});

it('does REFOCUS correctly', () => {
  expect(reducer(startState, {
    type: actions.REFOCUS,
    resource: 'r',
    children: 'c',
    rootPath: 'p',
  })).toEqual({
    resource: 'r',
    children: 'c',
    rootPath: 'p',
    isLoadingChildren: false,
    isUpdating: false,
  });
});

it('does ADD_CHILD correctly', () => {
  expect(reducer(startState, {
    type: actions.ADD_CHILD,
    resource: {id: 'child2'},
  })).toEqual({
    resource: startState.resource,
    children: [{id: 'child1'}, {id: 'child2'}],
    rootPath: [],
    isLoadingChildren: false,
    isUpdating: false,
  });
});

it('does setResourceFocus correctly', done => {
  mockAxios.onGet('/item/i/rootpath').reply(200, [{type: 'item', object: {_id: 'i', _modelType: 'item'}}]);
  mockAxios.onGet('/item/i').reply(200, {_id: 'i', _modelType: 'item'});
  mockAxios.onGet('/item/i/files').reply(200, [{_id: 'f', _modelType: 'file'}]);
  const store = mockStore(startState);
  actions.setResourceFocus('item', 'i', 'q')(store.dispatch).then(() => {
    expect(store.getActions().map(action => action.type)).toEqual([
      actions.REFOCUS_REQUESTED,
      actions.REFOCUS,
    ]);
    done();
  });
});
