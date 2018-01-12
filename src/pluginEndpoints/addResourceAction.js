import resources from '../resources';

const addResourceAction = ({type, key, component, condition}) => {
  resources[type].actions.push({key, component, condition});
};

export default addResourceAction;
