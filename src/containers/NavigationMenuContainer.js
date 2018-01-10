import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { retrieveMenuItems } from '../modules/main';
import NavigationMenu from '../components/NavigationMenu';

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    menuItems: retrieveMenuItems(state),
  };
};

const NavigationMenuContainer = withRouter(connect(
  mapStateToProps
)(NavigationMenu));

export default NavigationMenuContainer;
