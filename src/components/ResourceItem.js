import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Responsive, Segment } from 'semantic-ui-react';
import './ResourceItem.css';

const ResourceItem = ({ isRouteLink = true, url, icon, name, description }) => (
  <Segment className='ResourceItem-segment' as={isRouteLink ? Link : 'a'} {...{[isRouteLink ? 'to' : 'href']: url}}>
    <div className='ResourceItem-header'><Icon name={icon} />{name}</div>
    <Responsive className='ResourceItem-detail' as='div' minWidth={768}>{description}</Responsive>
  </Segment>
);

export default ResourceItem;
