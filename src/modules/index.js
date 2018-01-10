import { combineReducers } from 'redux';
import main from './main';
import modal from './modal';
import user from './user';
import focusedResource from './focusedResource';

export default combineReducers({
  main,
  modal,
  user,
  focusedResource,
});
