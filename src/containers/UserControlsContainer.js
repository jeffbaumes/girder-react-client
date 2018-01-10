import { connect } from 'react-redux';
import UserControls from '../components/UserControls';
import { checkLogin, login, logout, openLoginModal, closeLoginModal } from '../modules/user';

const mapStateToProps = state => {
  return {
    login: state.user.login,
    loginModalOpen: state.user.loginModalOpen,
    loginErrorMessage: state.user.loginErrorMessage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLoginStatus: () => {
      dispatch(checkLogin());
    },
    onLogout: () => {
      dispatch(logout());
    },
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
    onOpenLoginModal: () => {
      dispatch(openLoginModal());
    },
    onCloseLoginModal: () => {
      dispatch(closeLoginModal());
    },
  };
};

const UserControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserControls);

export default UserControlsContainer;
