import HomePage from './pages/HomePage';
import ResourcePageContainer from './containers/ResourcePageContainer';
import resources from './resources';
import bindProps from './bindProps';

const resourceRoutes = Object.assign({}, ...Object.keys(resources).map(type => {
  const component = bindProps(ResourcePageContainer, {type});
  return {
    [type]: {component},
    [`${type}/search/:query`]: {component},
    [`${type}/:id`]: {component},
  };
}));

export default {
  '': {
    component: HomePage,
  },
  'admin-console': {
    component: HomePage,
  },
  ...resourceRoutes,
};
