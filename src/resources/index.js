import React from 'react';
import * as collection from './collection';
import * as file from './file';
import * as folder from './folder';
import * as group from './group';
import * as groupMember from './groupMember';
import * as item from './item';
import * as user from './user';

const resources = {
  collection,
  file,
  folder,
  group,
  groupMember,
  item,
  user,
};

export default resources;

export const AnyResourceItem = ({resource}) => {
  const { item: Item } = resources[resource.type];
  return <Item resource={resource} />;
};
