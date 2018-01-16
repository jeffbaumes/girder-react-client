import React from 'react';
import axios from 'axios';
import { rootModel, resourceFromModel } from './resource';
import ResourceItem from '../components/ResourceItem';
import accessLevels from './accessLevels';

export const type = 'user';
export const name = 'User';
export const icon = 'user';
export const rootChildrenHeading = 'Users';
export const childrenHeading = 'Contents';

export const fromModel = user => (
  {
    ...resourceFromModel(user),
    name: user.name || `${user.firstName} ${user.lastName}`,
    description: user.description || user.login,
  }
);

export const fetchOne = ({ id }) => {
  return axios.get(`/${type}/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["${type}"]&limit=100`).then(result => {
    return result.data.user || [];
  });
};

export const fetchResourcePath = () => {
  return Promise.resolve([rootModel(type)]);
};

export const fetchChildren = ({ id }) => {
  return axios.get(`/folder?parentType=${type}&parentId=${id}`).then(result => {
    return result.data;
  });
};

export const create = ({login, password, firstName, lastName, email}) => {
  var params = new URLSearchParams();
  params.append('login', login);
  params.append('password', password);
  params.append('firstName', firstName);
  params.append('lastName', lastName);
  params.append('email', email);
  return axios.post('/user', params).then(result => {
    return result.data;
  });
};

export const remove = ({id}) => {
  return axios.delete(`/${type}/${id}`).then(result => result.data);
};

export const item = ({ resource }) => (
  <ResourceItem
    url={`/${type}/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);

export const actions = [
  {
    key: 'new-folder',
    component: 'folder.createAction',
    condition: resource => resource.accessLevel >= accessLevels.WRITE,
  },
];
