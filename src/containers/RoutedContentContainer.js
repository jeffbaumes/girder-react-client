import { connect } from 'react-redux';
import RoutedContent from '../components/RoutedContent';
import contentRouteMap from '../contentRouteMap';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    routes: state.main.contentRoutes.map(({ id }) => (
      {
        id,
        component: contentRouteMap[id].component,
      }
    )),
  };
};

const RoutedContentContainer = connect(
  mapStateToProps
)(RoutedContent);

export default withRouter(RoutedContentContainer);
