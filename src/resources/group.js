import React from 'react';
import axios from 'axios';
import bindProps from '../bindProps';
import { rootModel, resourceFromModel } from './resource';
import EditResourceContainer from '../containers/EditResourceContainer';
import ResourceItem from '../components/ResourceItem';
import RemoveResourceContainer from '../containers/RemoveResourceContainer';
import accessLevels from './accessLevels';

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

export const createAction = EditResourceContainer;

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

export const rootActions = [
  {
    key: 'new-group',
    component: 'group.createAction',
    condition: ({ user }) => user.id,
  },
];

export const actions = [
  {
    key: 'update-group',
    component: 'group.updateAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.WRITE,
  },
  {
    key: 'new-group-member',
    component: 'groupMember.createAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.WRITE,
  },
  {
    key: 'remove-group',
    component: 'group.removeAction',
    condition: ({ resource }) => resource.accessLevel >= accessLevels.ADMIN,
  },
];
