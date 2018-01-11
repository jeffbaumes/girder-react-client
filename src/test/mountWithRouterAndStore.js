import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

const mountWithRouterAndStore = (component, store) => {
  return mount(<Provider store={store}><Router>{component}</Router></Provider>);
};

export default mountWithRouterAndStore;
