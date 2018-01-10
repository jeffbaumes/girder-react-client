import React from 'react';

const bindProps = (Comp, props) => (
  ownProps => <Comp {...props} {...ownProps}/>
);

export default bindProps;
