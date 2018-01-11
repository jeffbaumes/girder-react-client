import React from 'react';
import axios from 'axios';
import { resourceFromModel, rootModel } from './resource';
import bindProps from '../bindProps';
import ResourceItem from '../components/ResourceItem';
import NewResourceContainer from '../containers/NewResourceContainer';

export const type = 'collection';
export const name = 'Collection';
export const icon = 'sitemap';
export const rootChildrenHeading = 'Collections';
export const childrenHeading = 'Contents';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/${type}/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["${type}"]&limit=100`).then(result => {
    return result.data.collection || [];
  });
};

export const fetchResourcePath = () => {
  return Promise.resolve([rootModel(type)]);
};

export const fetchChildren = ({ id }) => {
  return axios.get(`/folder?parentType=${type}&parentId=${id}`).then(result => {
    return result.data;
  });
}

export const create = ({name, description}) => {
  var params = new URLSearchParams();
  params.append('name', name);
  params.append('description', description || '');
  return axios.post(`/${type}`, params).then(result => {
    return result.data;
  });
};

export const item = ({ resource }) => (
  <ResourceItem
    url={`/${type}/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);

export const createAction = bindProps(NewResourceContainer, {type, name, icon});

export const rootChildActions = [
  {
    key: 'new-collection',
    component: 'collection.createAction',
  },
];

export const childActions = [
  {
    key: 'new-folder',
    component: 'folder.createAction',
  },
];
