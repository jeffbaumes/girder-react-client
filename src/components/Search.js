import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Input, Menu } from 'semantic-ui-react';

class Search extends Component {

  handleChange = (e, { value }) => {
    const type = this.props.match.params.type;
    if (value === '') {
      this.props.history.push(`/${type}`);
    } else {
      this.props.history.push(`/${type}/search/${value}`);
    }
  }

  handleClear = () => {
    const type = this.props.match.params.type;
    this.props.history.push(`/${type}`);
  }

  render() {
    const query = this.props.match.params.query || '';
    let icon;
    if (query.length > 0) {
      icon = <Icon name='close' link onClick={this.handleClear} />;
    } else {
      icon = 'search';
    }
    return (
      <Menu.Item>
        <Input inverted icon={icon} placeholder='Search...' value={query} onChange={this.handleChange} />
      </Menu.Item>
    );
  };
}

export default withRouter(Search);
