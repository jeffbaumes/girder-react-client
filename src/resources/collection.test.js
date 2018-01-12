import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as collection from './collection';

let mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

it('resourceFromModel converts from model to resource', () => {
  expect(collection.fromModel({
    _id: 'a',
    _modelType: 'collection',
    name: 'c',
    description: 'd',
    other: 'o',
  })).toEqual({
    id: 'a',
    type: 'collection',
    name: 'c',
    description: 'd',
    other: 'o',
  });
});

it('fetchOne retrieves a collection', done => {
  mock.onGet('/collection/foo').reply(200, {_id: 'foo'});
  collection.fetchOne({id: 'foo'}).then(model => {
    expect(model).toEqual({_id: 'foo'});
    done();
  });
});

it('fetchMany retrieves collection list', done => {
  const data = [{_id: 'foo'}, {_id: 'bar'}];
  mock.onGet('/resource/search?q=foo&mode=prefix&types=["collection"]&limit=100')
    .reply(200, {collection: data});
  collection.fetchMany({query: 'foo'}).then(model => {
    expect(model).toEqual(data);
    done();
  });
});

it('fetchResourcePath is a simple root model', done => {
  collection.fetchResourcePath().then(path => {
    expect(path).toEqual([
      {
        _id: 'collection',
        _modelType: 'collection',
        name: 'Collections',
        description: '',
        isRoot: true,
      },
    ]);
    done();
  });
});

it('fetchChildren retrieves child folders', done => {
  const data = [{_id: 'foo'}, {_id: 'bar'}];
  mock.onGet('/folder?parentType=collection&parentId=foo')
    .reply(200, data);
  collection.fetchChildren({id: 'foo'}).then(model => {
    expect(model).toEqual(data);
    done();
  });
});

it('create produces correct request', done => {
  const data = {_id: 'foo'};
  mock.onPost('/collection')
    .reply(200, data);
  collection.create({name: 'name', description: 'description'}).then(model => {
    expect(model).toEqual(data);
    done();
  });
});

// export const item = ({ resource }) => (
//   <ResourceItem
//     url={`/${type}/${resource.id}`}
//     icon={icon}
//     name={resource.name}
//     description={resource.description}
//   />
// );

// export const createAction = bindProps(NewResourceContainer, {type, name, icon});

// export const rootActions = [
//   {
//     key: 'new-collection',
//     component: 'collection.createAction',
//   },
// ];

// export const actions = [
//   {
//     key: 'new-folder',
//     component: 'folder.createAction',
//   },
// ];
