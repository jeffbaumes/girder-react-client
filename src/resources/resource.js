export const rootName = type => (
  `${type.charAt(0).toUpperCase()}${type.substring(1)}s`
);

export const rootModel = type => (
  {
    name: rootName(type),
    description: '',
    _id: type,
    _modelType: type,
  }
);

export const resourceFromModel = model => (
  {
    id: model._id,
    name: model.name,
    description: model.description,
    type: model._modelType,
  }
);
