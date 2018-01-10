import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResourcePage from '../pages/ResourcePage';
import { setResourceFocus } from '../modules/focusedResource';

const mapStateToProps = state => {
  const { resource, rootPath, children } = state.focusedResource;
  return {
    name: resource.name,
    description: resource.description,
    breadcrumbs: rootPath,
    children,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetch: () => {
      dispatch(setResourceFocus(ownProps.type, ownProps.match.params.id, ownProps.match.params.query));
    },
  }
);

const ResourcePageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourcePage));

export default ResourcePageContainer;
