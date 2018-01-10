import React, { Component } from 'react';
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
      name,
      type,
      description,
      icon,
      breadcrumbs,
      childrenHeading,
      children,
      childActions,
      match: { params: { id } },
    } = this.props;

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
              {name}
              <Header.Subheader>
                {description}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Divider horizontal>{childrenHeading}</Divider>
          {
            childActions.map(action => {
              let ActionComponent = action.component;
              if (typeof ActionComponent === 'string') {
                const [type, field] = ActionComponent.split('.');
                ActionComponent = resources[type][field];
              }
              return <ActionComponent parentId={id} parentType={type} key={action.key} />;
            })
          }
          <Segment.Group>
            {
              children.map(resource => {
                return <AnyResourceItem resource={resource} key={resource.id} />;
              })
            }
          </Segment.Group>
        </Segment>
      </Container>
    );
  }
};

export default ResourcePage;
