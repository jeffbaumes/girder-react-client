import resources from '../resources';
import { rootModel } from '../resources/resource';

export const REFOCUS_REQUESTED = 'focusedResource/REFOCUS_REQUESTED';
export const REFOCUS = 'focusedResource/REFOCUS';
export const ADD_CHILD = 'focusedResource/ADD_CHILD';
export const UPDATE = 'focusedResource/UPDATE';

const nullResource = {
  id: null,
  name: '',
  description: '',
  type: null,
};

const initialState = {
  resource: nullResource,
  children: [],
  rootPath: [],
  isUpdating: false,
  isLoadingChildren: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REFOCUS_REQUESTED:
      return {
        ...state,
        resource: nullResource,
        children: [],
        rootPath: [],
        isUpdating: true,
      };
    case REFOCUS:
      return {
        ...state,
        resource: action.resource,
        children: action.children,
        rootPath: action.rootPath,
        isUpdating: false,
      };
    case UPDATE:
      return {
        ...state,
        resource: {
          ...state.resource,
          ...action.resourceUpdates,
        },
      };
    case ADD_CHILD:
      return {
        ...state,
        children: [...state.children, action.resource],
      };
    default:
      return state
  }
};

const anyResourceFromModel = model => {
  return resources[model._modelType].fromModel(model);
}

export const setResourceFocus = (type, id, query) => {
  return dispatch => {
    dispatch({
      type: REFOCUS_REQUESTED,
    });

    return Promise.all([
      id ? resources[type].fetchOne({id}) : rootModel(type),
      id ? resources[type].fetchResourcePath({id}) : Promise.resolve([]),
      id ? resources[type].fetchChildren({id}) : resources[type].fetchMany({query}),
    ]).then(([model, rootPath, children]) => {
      return dispatch({
        type: REFOCUS,
        resource: resources[type].fromModel(model),
        rootPath: [...rootPath, model].map(anyResourceFromModel),
        children: children.map(anyResourceFromModel),
      });
    });
  };
};

export const createChild = (type, options) => {
  return dispatch => {
    return resources[type].create(options).then(model => {
      return dispatch({
        type: ADD_CHILD,
        resource: resources[type].fromModel(model),
      });
    });
  };
};

export const update = (type, options) => {
  return dispatch => {
    return resources[type].update(options).then(model => {
      return dispatch({
        type: UPDATE,
        resourceUpdates: resources[type].fromModel(model),
      });
    });
  };
};
