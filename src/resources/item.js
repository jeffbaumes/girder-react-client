import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { resourceFromModel, rootModel } from './resource';
import ResourceItem from '../components/ResourceItem';
import EditResourceContainer from '../containers/EditResourceContainer';
import RemoveResourceContainer from '../containers/RemoveResourceContainer';
import accessLevels from './accessLevels';

export const type = 'item';
export const name = 'Item';
export const icon = 'file text';
export const rootChildrenHeading = 'Items';
export const childrenHeading = 'Files';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/${type}/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["${type}"]&limit=100`).then(result => {
    return result.data.item || [];
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
  return axios.get(`/${type}/${id}/files`).then(result => {
    return result.data;
  });
};

export const create = ({folderId, name, description}) => {
  var params = new URLSearchParams();
  params.append('folderId', folderId);
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

export const createAction = bindProps(EditResourceContainer, {
  onSubmit: (state, props) => {
    const { name = '', description = '' } = state;
    const { id: parentId } = props.resource;
    props.submit({folderId: parentId, name, description});
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

export const item = ({ resource }) => (
  <ResourceItem
    url={`/${type}/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);

export const accessLevelForPath = path => {
  const parent = path[path.length - 2];
  return parent.accessLevel;
};

export const actions = [
  {
    key: 'update-item',
    component: 'item.updateAction',
    condition: ({ path }) => accessLevelForPath(path) >= accessLevels.WRITE,
  },
  {
    key: 'remove-item',
    component: 'item.removeAction',
    condition: ({ path }) => accessLevelForPath(path) >= accessLevels.WRITE,
  },
];
