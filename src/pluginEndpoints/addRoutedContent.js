import contentRouteMap from '../contentRouteMap';

const addRoutedContent = ({route, component}) => {
  contentRouteMap[route] = {component};
};

export default addRoutedContent;
