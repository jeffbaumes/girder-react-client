import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditResource from '../components/EditResource';
import { openModal, closeModal } from '../modules/modal';
import { createChild, update } from '../modules/focusedResource';
import resources from '../resources';

const mapStateToProps = (state, ownProps) => {
  const type = ownProps.type || ownProps.resource.type;
  return {
    type,
    name: resources[type].name,
    icon: resources[type].icon,
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
      const type = ownProps.type || ownProps.resource.type;
      if (ownProps.update) {
        return dispatch(update(type, options)).then(() => {
          return dispatch(closeModal());
        });
      }
      return dispatch(createChild(type, options)).then(() => {
        return dispatch(closeModal());
      });
    }
  }
);

const EditResourceContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditResource));

export default EditResourceContainer;
