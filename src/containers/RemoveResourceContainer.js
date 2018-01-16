import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RemoveResource from '../components/RemoveResource';
import { openModal, closeModal } from '../modules/modal';
import { remove } from '../modules/focusedResource';

const mapStateToProps = (state, ownProps) => {
  const path = state.focusedResource.rootPath;
  return {
    modalOpen: state.modal.openModal === ownProps.actionId,
    parent: path[path.length - 2],
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
      return dispatch(remove(ownProps.resource.type, options)).then(() => {
        return dispatch(closeModal());
      });
    }
  }
);

const RemoveResourceContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveResource));

export default RemoveResourceContainer;
