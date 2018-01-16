import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { resourceFromModel, rootModel } from './resource';
import EditResourceContainer from '../containers/EditResourceContainer';
import ResourceItem from '../components/ResourceItem';
import RemoveResourceContainer from '../containers/RemoveResourceContainer';
import accessLevels from './accessLevels';

export const type = 'folder';
export const name = 'Folder';
export const icon = 'folder';
export const rootChildrenHeading = 'Folders';
export const childrenHeading = 'Contents';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/${type}/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["${type}"]&limit=100`).then(result => {
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
  return axios.post(`/${type}`, params).then(result => {
    return result.data;
  });
};

export const update = ({id, name, description}) => {
  var params = new URLSearchParams();
  params.append('name', name);
  params.append('description', description || '');
  return axios.put(`/${type}/${id}`, params).then(result => {
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

export const createAction = bindProps(EditResourceContainer, {
  type,
  onSubmit: (state, props) => {
    const { name = '', description = '' } = state;
    const { id : parentId, type : parentType } = props.resource;
    props.submit({parentId, parentType, name, description});
  },
});

export const updateAction = bindProps(EditResourceContainer, {
  update: true,
  initialValues: ({ name, description }) => ({name, description}),
  onSubmit: (state, props) => {
    const { name = '', description = '' } = state;
    const { id } = props.resource;
    props.submit({id, name, description});
  },
});

export const removeAction = RemoveResourceContainer;

export const actions = [
  {
    key: 'update-folder',
    component: 'folder.updateAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.WRITE,
  },
  {
    key: 'new-folder',
    component: 'folder.createAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.WRITE,
  },
  {
    key: 'new-item',
    component: 'item.createAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.WRITE,
  },
  {
    key: 'remove-folder',
    component: 'folder.removeAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.ADMIN,
  },
];
