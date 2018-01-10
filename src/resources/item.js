import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { resourceFromModel, rootModel } from './resource';
import ResourceItem from '../components/ResourceItem';
import NewResourceContainer from '../containers/NewResourceContainer';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/item/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["item"]&limit=100`).then(result => {
    return result.data.item || [];
  });
};

export const fetchResourcePath = ({ id }) => {
  return axios.get(`/item/${id}/rootpath`).then(result => {
    return [
      rootModel(result.data[0].type),
      ...result.data.map(item => item.object),
    ];
  });
};

export const fetchChildren = ({ id }) => {
  return axios.get(`/item/${id}/files`).then(result => {
    return result.data;
  });
};

export const create = ({folderId, name, description}) => {
  var params = new URLSearchParams();
  params.append('folderId', folderId);
  params.append('name', name);
  params.append('description', description || '');
  return axios.post('/item', params).then(result => {
    return result.data;
  });
};

export const type = 'item';
export const name = 'Item';
export const icon = 'file text';
export const rootChildrenHeading = 'Items';
export const childrenHeading = 'Files';

export const createAction = bindProps(NewResourceContainer, {
  type,
  name,
  icon,
  onSubmit: (state, props) => {
    const { name = '', description = '' } = state;
    const { parentId } = props;
    props.create({folderId: parentId, name, description});
  },
});

export const item = ({ resource }) => (
  <ResourceItem
    url={`/item/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);
