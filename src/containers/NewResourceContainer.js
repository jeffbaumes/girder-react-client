import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewResource from '../components/NewResource';
import { openModal, closeModal } from '../modules/modal';
import { createChild, update } from '../modules/focusedResource';

const mapStateToProps = (state, ownProps) => {
  return {
    modalOpen: state.modal.openModal === ownProps.actionId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onOpen: () => {
      return dispatch(openModal(ownProps.actionId));
    },
    onClose: () => {
      return dispatch(closeModal());
    },
    submit: options => {
      if (ownProps.update) {
        return dispatch(update(ownProps.type, options)).then(() => {
          return dispatch(closeModal());
        });
      }
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
