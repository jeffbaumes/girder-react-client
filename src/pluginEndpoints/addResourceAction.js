import resources from '../resources';

const addResourceAction = ({type, key, component}) => {
  resources[type].actions.push({key, component});
};

export default addResourceAction;
