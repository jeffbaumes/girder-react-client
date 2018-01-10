import React from 'react';
import axios from 'axios';
import { resourceFromModel, rootModel } from './resource';
import ResourceItem from '../components/ResourceItem';

export const type = 'file';
export const name = 'File';
export const icon = 'file';
export const rootChildrenHeading = 'Files';
export const childrenHeading = null;

export const fromModel = model => {
  const resource = resourceFromModel(model);
  resource.size = model.size;
  return resource;
};

export const fetchOne = ({ id }) => {
  return axios.get(`/file/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = (options = {}) => {
  return Promise.resolve([]);
};

export const fetchResourcePath = ({ id }) => {
  return axios.get(`/file/${id}/rootpath`).then(result => {
    return [
      rootModel(result.data[0].type),
      ...result.data.map(item => item.object),
    ];
  });
};

export const fetchChildren = ({ id }) => {
  return Promise.resolve([]);
};

export const item = ({ resource }) => (
  <ResourceItem
    url={`/api/v1/file/${resource.id}/download`}
    isRouteLink={false}
    icon={icon}
    name={resource.name}
    description={`${resource.size} bytes`}
  />
);
