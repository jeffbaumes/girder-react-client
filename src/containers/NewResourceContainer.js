import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewResource from '../components/NewResource';
import { openModal, closeModal } from '../modules/modal';
import { createChild } from '../modules/focusedResource';

const mapStateToProps = (state, ownProps) => {
  return {
    modalOpen: state.modal.openModal === `new-${ownProps.type}`,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onOpen: () => {
      return dispatch(openModal(`new-${ownProps.type}`));
    },
    onClose: () => {
      return dispatch(closeModal());
    },
    create: options => {
      return dispatch(createChild(ownProps.type, options)).then(() => {
        return dispatch(closeModal());
      });
    }
  }
);

const NewResourceContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewResource));

export default NewResourceContainer;
