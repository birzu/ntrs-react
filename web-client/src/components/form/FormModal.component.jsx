import React from 'react';
import { connect } from 'react-redux';

import { showModal, hideModal } from '../../redux/reducers/modal.reducer';

import Modal from '../modal/Modal.component';
import SignInForm from '../form/SignInForm.component';
import RegisterForm from '../form/RegisterForm.component';

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal()),
  hideModal: () => dispatch(hideModal())
});

const FormModal = ({ signin, register, ...props }) => {
  return register ? <RegisterForm {...props} /> : <SignInForm {...props} />;
};

export default connect(null, mapDispatchToProps)(Modal(FormModal));
