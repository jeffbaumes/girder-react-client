import React from 'react';
import resources from '../resources';

const AnyResourceItem = ({resource}) => {
  const { item: Item } = resources[resource.type];
  return <Item resource={resource} />;
};

export default AnyResourceItem;
