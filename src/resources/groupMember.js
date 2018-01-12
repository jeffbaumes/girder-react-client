import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import bindProps from '../bindProps';
import ResourceItem from '../components/ResourceItem';
import NewResourceContainer from '../containers/NewResourceContainer';
import { resourceFromModel } from './resource';

export const fromModel = groupMember => (
  {
    ...resourceFromModel(groupMember),
    name: groupMember.name || `${groupMember.firstName} ${groupMember.lastName}`,
    description: groupMember.description || groupMember.login,
  }
);

export const create = ({groupId, userId, level, force}) => {
  var params = new URLSearchParams();
  params.append('userId', userId);
  params.append('level', level || '0');
  params.append('force', force || 'false');
  return Promise.all([
    axios.post(`/group/${groupId}/invitation`, params),
    axios.get(`/user/${userId}`),
  ]).then(([result, model]) => {
    return {
      ...model.data,
      _modelType: 'groupMember',
      memberType: model.data._modelType,
      acceptedInvite: force === 'true',
      accessLevel: +level,
    };
  });
};

export const type = 'groupMember';
export const name = 'Group Member';
export const icon = 'user';

export const accessLevelNames = {
  0: 'Member',
  1: 'Moderator',
  2: 'Administrator'
};

export const item = ({ resource }) => (
  <ResourceItem
    url={`/user/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={accessLevelNames[resource.accessLevel]}
  />
);

export const createAction = bindProps(NewResourceContainer, {
  type,
  name,
  icon,
  formInputs: ({ onChange }) => (
    <div>
      <Form.Input label='User ID' name='userId' onChange={onChange} />
      <Form.Input label='Access level' name='level' onChange={onChange} />
      <Form.Input label='Direct add' name='force' onChange={onChange} />
    </div>
  ),
  onSubmit: (state, props) => {
    const { userId = '', level = '0', force = 'false' } = state;
    const { id : parentId } = props;
    props.create({groupId: parentId, userId, level, force});
  },
});

