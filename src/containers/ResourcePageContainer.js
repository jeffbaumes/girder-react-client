import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ResourcePage from '../pages/ResourcePage';
import { setResourceFocus } from '../modules/focusedResource';

const mapStateToProps = state => {
  const { resource, rootPath, children } = state.focusedResource;
  return {
    resource: resource,
    breadcrumbs: rootPath,
    children,
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    fetch: () => {
      return dispatch(setResourceFocus(
        ownProps.location.pathname.split('/')[1],
        ownProps.match.params.id,
        ownProps.match.params.query,
      ));
    },
  }
);

const ResourcePageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourcePage));

export default ResourcePageContainer;
