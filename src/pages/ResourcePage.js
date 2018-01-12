import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';
import AnyResourceItem from '../components/AnyResourceItem';
import resources from '../resources';

class ResourcePage extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  componentWillReceiveProps(newProps) {
    const { match: { params: { id, query } } } = this.props;
    const { match: { params: { id: newId, query: newQuery } } } = newProps;
    if (newId !== id) {
      newProps.fetch();
    }
    if (newQuery !== query) {
      newProps.fetch();
    }
  }

  render() {
    const {
      resource,
      breadcrumbs = [],
      children = [],
    } = this.props;

    if (!resource || !resource.id || !resources[resource.type]) {
      return null;
    }

    const icon = resources[resource.type].icon;
    let actions;
    let childrenHeading;
    if (resource.isRoot) {
      actions = resources[resource.type].rootActions || [];
      childrenHeading = resources[resource.type].rootChildrenHeading || 'Contents';
    } else {
      actions = resources[resource.type].actions || [];
      childrenHeading = resources[resource.type].childrenHeading || 'Contents';
    }

    return (
      <Container>
        <Segment basic>
          <Breadcrumb>
          {
            Array.prototype.concat(...breadcrumbs.map((crumb, i) => {
              let url = `/${crumb.type}`;
              if (crumb.id !== crumb.type) {
                url += `/${crumb.id}`;
              }
              const section = <Breadcrumb.Section as={Link} to={url} key={crumb.id}>{crumb.name}</Breadcrumb.Section>;
              if (i < breadcrumbs.length - 1) {
                return [
                  section,
                  <Breadcrumb.Divider key={`${crumb.id}-divider`} icon='right angle' />,
                ];
              }
              return [section];
            }))
          }
          </Breadcrumb>
          <Header>
            <Icon name={icon} />
            <Header.Content>
              {resource.name}
              <Header.Subheader>
                {resource.description}
              </Header.Subheader>
            </Header.Content>
          </Header>
          {
            actions.filter(action => !action.condition || action.condition(resource)).map(action => {
              let ActionComponent = action.component;
              if (typeof ActionComponent === 'string') {
                const [type, field] = ActionComponent.split('.');
                ActionComponent = resources[type][field];
              }
              return <ActionComponent resource={resource} key={action.key} />;
            })
          }
          {
            children.length > 0 &&
            <Fragment>
              <Divider horizontal>{childrenHeading}</Divider>
              <Segment.Group>
                {
                  children.map(resource => {
                    return <AnyResourceItem resource={resource} key={resource.id} />;
                  })
                }
              </Segment.Group>
            </Fragment>
          }
        </Segment>
      </Container>
    );
  }
};

export default ResourcePage;
