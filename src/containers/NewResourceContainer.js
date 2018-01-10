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
      dispatch(openModal(`new-${ownProps.type}`));
    },
    onClose: () => {
      dispatch(closeModal());
    },
    create: options => {
      dispatch(createChild(ownProps.type, options)).then(() => {
        dispatch(closeModal());
      });
    }
  }
);

const NewResourceContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewResource));

export default NewResourceContainer;
