export const rootName = type => (
  `${type.charAt(0).toUpperCase()}${type.substring(1)}s`
);

export const rootModel = type => (
  {
    name: rootName(type),
    description: '',
    _id: type,
    _modelType: type,
    isRoot: true,
  }
);

export const resourceFromModel = model => {
  const {_id, _modelType, ...properties} = model;
  return {
    ...properties,
    id: _id,
    type: _modelType,
  };
};
