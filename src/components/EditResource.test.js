import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Modal } from 'semantic-ui-react';
import EditResource from './EditResource';

it('renders modal set to be open', () => {
  const comp = shallow(<EditResource
    modalOpen={true}
  />);
  expect(comp.find(Modal).props().open).toBe(true);
});

it('calls onOpen', () => {
  const onOpen = jest.fn();
  const comp = mount(<EditResource
    onOpen={onOpen}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  expect(onOpen).toHaveBeenCalled();
});

it('calls onClose on cancel', () => {
  const onClose = jest.fn();
  const submit = jest.fn();
  const comp = shallow(<EditResource
    onClose={onClose}
    submit={submit}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Cancel'}).simulate('click');
  expect(submit).not.toHaveBeenCalled();
  expect(onClose).toHaveBeenCalled();
});

it('calls onClose and submit on submit', () => {
  const onClose = jest.fn();
  const submit = jest.fn();
  const comp = shallow(<EditResource
    onClose={onClose}
    submit={submit}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(submit).toHaveBeenCalledWith({name: '', description: ''});
  expect(onClose).toHaveBeenCalled();
});

it('calls submit on submit with correct arguments', () => {
  const submit = jest.fn();
  const comp = shallow(<EditResource
    submit={submit}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.instance().handleChange(null, {name: 'name', value: 'Hello'});
  comp.instance().handleChange(null, {name: 'description', value: 'World'});
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(submit).toHaveBeenCalledWith({name: 'Hello', description: 'World'});
});

it('calls onSubmit if specified, which may not call submit', () => {
  const onSubmit = jest.fn();
  const submit = jest.fn();
  const comp = shallow(<EditResource
    onSubmit={onSubmit}
    submit={submit}
    name='Item'
  />);
  comp.find(Button).at(0).simulate('click');
  comp.find(Button).find({content: 'Create Item'}).simulate('click');
  expect(onSubmit).toHaveBeenCalled();
  expect(submit).not.toHaveBeenCalled();
});
