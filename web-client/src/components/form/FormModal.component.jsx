import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { animated } from 'react-spring';

import {
  showModal,
  setCurrentModal,
  hideModal
} from '../../redux/reducers/modal.reducer';

import UIButton from '../core-ui/button/UIButton';
import Modal from '../modal/Modal.component';
import SignInForm from '../form/SignInForm.component';
import RegisterForm from '../form/RegisterForm.component';

import './FormModal.styles.scss';
import Logo from '../../assets/logo-green-2x.png';

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal()),
  hideModal: () => dispatch(hideModal()),
  setModalName: modalName => dispatch(setCurrentModal(modalName))
});
const FormModal = ({ signin, register, style, ...props }) => {
  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  });

  return (
    <animated.div className="form-modal" style={style}>
      <div className="form-modal__side">
        <img src={Logo} alt="logo" className="form-modal__logo-img"></img>
        <h3 className="form-modal__heading form-modal__heading--2 ">
          {signin
            ? `Don't have a natours account ?`
            : 'Already have an account.'}
        </h3>
        <UIButton utilCls="u-mt-lg" modifier="submit-bg">
          {signin ? 'sign up now' : 'log in to your account'}
        </UIButton>
      </div>
      <div className="form-modal__content">
        {register ? <RegisterForm {...props} /> : <SignInForm {...props} />}
      </div>
    </animated.div>
  );
};

export default connect(null, mapDispatchToProps)(Modal(FormModal));
