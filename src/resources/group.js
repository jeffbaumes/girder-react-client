import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { rootModel, resourceFromModel } from './resource';
import EditResourceContainer from '../containers/EditResourceContainer';
import ResourceItem from '../components/ResourceItem';

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/group/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = ({ query = '' } = {}) => {
  return axios.get(`/resource/search?q=${query}&mode=prefix&types=["group"]&limit=100`).then(result => {
    return result.data.group || [];
  });
};

export const fetchResourcePath = () => {
  return Promise.resolve([rootModel('group')]);
};

export const fetchChildren = ({ id }) => {
  return Promise.all([
    axios.get(`/group/${id}/member`),
    axios.get(`/group/${id}/access`),
  ])
  .then(([{ data: members }, { data: { access } }]) => {
    return members.map(member => {
      const accessForMember = [...access.users, ...access.groups].find(a => a.id === member._id);
      return {
        ...member,
        _modelType: 'groupMember',
        memberType: member._modelType,
        accessLevel: accessForMember ? accessForMember.level : 0,
      };
    });
  });
};

export const create = ({name, description}) => {
  var params = new URLSearchParams();
  params.append('name', name);
  params.append('description', description || '');
  return axios.post('/group', params).then(result => {
    return result.data;
  });
};

export const type = 'group';
export const name = 'Group';
export const icon = 'users';
export const rootChildrenHeading = 'Groups';
export const childrenHeading = 'Members';

export const item = ({ resource }) => (
  <ResourceItem
    url={`/group/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);

export const createAction = bindProps(EditResourceContainer, {type, name, icon});

export const rootActions = [
  {
    key: 'new-group',
    component: 'group.createAction',
  },
];

export const actions = [
  {
    key: 'new-group-member',
    component: 'groupMember.createAction',
  },
];
