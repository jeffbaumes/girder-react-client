import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { resourceFromModel, rootModel } from './resource';
import NewResourceContainer from '../containers/NewResourceContainer';
import ResourceItem from '../components/ResourceItem';

export const type = 'folder';
export const name = 'Folder';
export const icon = 'folder';
export const rootChildrenHeading = 'Folders';
export const childrenHeading = 'Contents';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/folder/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["folder"]&limit=100`).then(result => {
    return result.data.folder || [];
  });
};

export const fetchResourcePath = ({ id }) => {
  return axios.get(`/${type}/${id}/rootpath`).then(result => {
    return [
      rootModel(result.data[0].type),
      ...result.data.map(item => item.object),
    ];
  });
};

export const fetchChildren = ({ id }) => {
  return Promise.all([
    axios.get(`/folder?parentType=folder&parentId=${id}`),
    axios.get(`/item?folderId=${id}`),
  ])
  .then(([childFolders, childItems]) => {
    return [...childFolders.data, ...childItems.data];
  });
};

export const create = ({parentId, parentType, name, description}) => {
  var params = new URLSearchParams();
  params.append('parentId', parentId);
  params.append('parentType', parentType);
  params.append('name', name);
  params.append('description', description || '');
  return axios.post('/folder', params).then(result => {
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

export const createAction = bindProps(NewResourceContainer, {
  type,
  name,
  icon,
  onSubmit: (state, props) => {
    const { name = '', description = '' } = state;
    const { id : parentId, type : parentType } = props.resource;
    props.create({parentId, parentType, name, description});
  },
});

export const actions = [
  {
    key: 'new-folder',
    component: 'folder.createAction',
  },
  {
    key: 'new-item',
    component: 'item.createAction',
  },
];
