import React, { Component } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

class NewResource extends Component {

  state = {}

  defaultFormInputs = ({ onChange }) => (
    <div>
      <Form.Input label='Name' name='name' onChange={onChange} />
      <Form.Input label='Description' name='description' onChange={onChange} />
    </div>
  )

  openModal = () => {
    this.setState({});
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({[name]: value});
  }

  submit = () => {
    let onSubmit = this.props.onSubmit;

    if (!onSubmit) {
      onSubmit = (state, props) => {
        const { name = '', description = '' } = state;
        props.create({name, description});
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
      name
    } = this.props;
    return (
      <Modal
        trigger={
          <Button>
            <Icon.Group>
              <Icon name={icon} />
              <Icon corner name='add' />
            </Icon.Group>
            {` Add ${name}`}
          </Button>
        }
        open={modalOpen}
        onOpen={this.openModal}
        onClose={onClose}
      >
        <Modal.Header>New {name}</Modal.Header>
        <Modal.Content>
          <Form error onSubmit={this.submit}>
            <FormInputs onChange={this.handleChange} />
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
          <Button color='green' onClick={this.submit} content={`Create ${name}`} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default NewResource;
