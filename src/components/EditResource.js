import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

class EditResource extends Component {

  state = {}

  defaultFormInputs = ({ state, onChange }) => (
    <div>
      <Form.Input label='Name' name='name' value={state.name || ''} onChange={onChange} />
      <Form.Input label='Description' name='description' value={state.description || ''} onChange={onChange} />
    </div>
  )

  openModal = () => {
    this.setState({});
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    if (this.props.update) {
      this.setState(this.props.initialValues(this.props.resource));
    }
    this.opening = true;
  }

  handleChange = (e, { name, value }) => {
    this.setState({[name]: value});
  }

  submit = () => {
    let onSubmit = this.props.onSubmit;

    if (!onSubmit) {
      onSubmit = (state, props) => {
        const { name = '', description = '' } = state;
        props.submit({name, description});
      };
    }

    onSubmit(this.state, this.props);
  }

  render() {
    const {
      modalOpen = false,
      onClose = () => {},
      formInputs : FormInputs = this.defaultFormInputs,
      errorMessage,
      icon,
      name,
      update = false,
    } = this.props;
    return (
      <Modal
        size='tiny'
        trigger={
          <Button>
            {
              update ?
              <Icon name='edit' />
              :
              <Icon.Group>
                <Icon name={icon} />
                <Icon corner name='add' />
              </Icon.Group>
            }
            {update ? 'Edit' : ` Add ${name}`}
          </Button>
        }
        open={modalOpen}
        onOpen={this.openModal}
        onClose={onClose}
      >
        <Modal.Header>
          <Icon name={icon} />
          {`${update ? 'Edit' : 'Create'} ${name}`}
        </Modal.Header>
        <Modal.Content>
          <Form error onSubmit={this.submit} ref={form => {
            if (form && this.opening) {
              this.opening = false;
              const formEl = findDOMNode(form);
              const inputs = formEl.getElementsByTagName('input');
              if (inputs.length > 0) {
                inputs[0].focus();
                inputs[0].selectionStart = inputs[0].selectionEnd = inputs[0].value.length;
              }
            }
          }}>
            <FormInputs state={this.state} onChange={this.handleChange} />
            <Message
              error
              content={errorMessage}
            />
            <div style={{display: 'none'}}>
              <Form.Button />
            </div>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose} content='Cancel' />
          <Button color='green' onClick={this.submit} content={`${update ? 'Update' : 'Create'} ${name}`} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditResource;
