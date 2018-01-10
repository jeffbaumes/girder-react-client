import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Modal } from 'semantic-ui-react';
import NewResource from './NewResource';

it('renders modal set to be open', () => {
  const comp = shallow(<NewResource
    modalOpen={true}
  />);
  expect(comp.find(Modal).props().open).toBe(true);
});

it('calls onOpen', () => {
  const onOpen = jest.fn();
  const comp = mount(<NewResource
    onOpen={onOpen}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  expect(onOpen).toHaveBeenCalled();
});

it('calls onClose on cancel', () => {
  const onClose = jest.fn();
  const create = jest.fn();
  const comp = shallow(<NewResource
    onClose={onClose}
    create={create}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Cancel'}).simulate('click');
  expect(create).not.toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
});

it('calls onClose and create on submit', () => {
  const onClose = jest.fn();
  const create = jest.fn();
  const comp = shallow(<NewResource
    onClose={onClose}
    create={create}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(create).toHaveBeenCalledWith({name: '', description: ''});
  expect(onClose).toHaveBeenCalled();
});

it('calls create on submit with correct arguments', () => {
  const create = jest.fn();
  const comp = shallow(<NewResource
    create={create}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.instance().handleChange(null, {name: 'name', value: 'Hello'});
  comp.instance().handleChange(null, {name: 'description', value: 'World'});
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(create).toHaveBeenCalledWith({name: 'Hello', description: 'World'});
});

it('calls onSubmit if specified, which may not call create', () => {
  const onSubmit = jest.fn();
  const create = jest.fn();
  const comp = shallow(<NewResource
    onSubmit={onSubmit}
    create={create}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(onSubmit).toHaveBeenCalled();
  expect(create).not.toHaveBeenCalled();
});
