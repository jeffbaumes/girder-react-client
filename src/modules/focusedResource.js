import resources from '../resources';
import { rootModel } from '../resources/resource';

export const REFOCUS_REQUESTED = 'focusedResource/REFOCUS_REQUESTED';
export const REFOCUS = 'focusedResource/REFOCUS';
export const ADD_CHILD = 'focusedResource/ADD_CHILD';
export const MORE_CHILDREN_REQUESTED = 'focusedResource/MORE_CHILDREN_REQUESTED';
export const MORE_CHILDREN = 'focusedResource/MORE_CHILDREN';

// All resource objects in the redux state are formatted as follows:
// {
//   type: 'user',
//   name: 'John Doe',
//   description: 'johndoe',
//   id: '8540056599af9437d03943743',
// }

// Resource parents (i.e. Collections, Users, etc.) are identical but have null id:
// {
//   type: 'user',
//   name: 'Users',
//   description: null,
//   id: null,
// }

// Every resource type has the following functions that return a Promise:
// fetchOne({ id: String }): Promise<Resource>
// fetchMany({ limit: Integer, query: String, sort: String, sortDir: Integer }): Promise<Resource>
// fetchResourcePath({ id: String }): Promise<List<Resource> >
// fetchChildren({ id: String, limit: Integer, query: String, sort: String, sortDir: Integer }): Promise<List<Resource> >

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
    case ADD_CHILD:
      return {
        ...state,
        children: [...state.children, action.resource],
      };
    case MORE_CHILDREN_REQUESTED:
      return {
        ...state,
        isLoadingChildren: true,
      };
    case MORE_CHILDREN:
      return {
        ...state,
        children: [...state.children, ...action.children],
        isLoadingChildren: false,
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

export const loadMore = () => { throw new Error('Not implemented'); }
