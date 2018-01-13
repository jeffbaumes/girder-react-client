import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TableViewAction = ({resource: {id}}) => (
  <Button as={Link} to={`/file/${id}/table-view`} content='Table Viewer' />
)

export default TableViewAction;
