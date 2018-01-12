import HomePage from './pages/HomePage';
import ResourcePageContainer from './containers/ResourcePageContainer';
import bindProps from './bindProps';
import resources from './resources';

const resourceRoutes = Object.assign({}, ...Object.keys(resources).map(type => {
  const resource = resources[type];
  const topLevelComponent = bindProps(ResourcePageContainer, {
    type,
    icon: resource.icon,
    childrenHeading: resource.rootChildrenHeading,
    actions: resource.rootActions || [],
  });
  const singleResourceComponent = bindProps(ResourcePageContainer, {
    type,
    icon: resource.icon,
    childrenHeading: resource.childrenHeading,
    actions: resource.actions || [],
  });
  return {
    [type]: {component: topLevelComponent},
    [`${type}/search/:query`]: {component: topLevelComponent},
    [`${type}/:id`]: {component: singleResourceComponent},
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
