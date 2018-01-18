import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { fetchMany, fromModel } from '../resources/user';

class UserSelection extends Component {
  componentWillMount() {
    this.setState({
      isFetching: false,
      value: this.props.multiple ? [] : null,
      options: [],
    });
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSearchChange = (e, { searchQuery }) => {
    this.setState({isFetching: true})
    fetchMany({query: searchQuery}).then(results => {
      this.setState({
        options: results.map(fromModel).map(user => (
          {
            key: user.id,
            text: user.name,
            value: user.id,
          }
        )),
        isFetching: false,
      });
    });
  }

  render() {
    const { options, isFetching, value } = this.state;
    const { multiple = false } = this.props;

    return (
      <Dropdown
        fluid
        selection
        multiple={multiple}
        search={true}
        options={options}
        value={value}
        placeholder={`Select ${multiple ? 'User' : 'Users'}`}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        loading={isFetching}
      />
    )
  }
}

export default UserSelection
