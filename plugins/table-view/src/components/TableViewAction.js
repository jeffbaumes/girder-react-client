import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TableViewAction = ({resource: {id}}) => (
  <Button as={Link} to={`/file/${id}/table-view`}>
    <Icon name='table' />View Table
  </Button>
);

export default TableViewAction;
