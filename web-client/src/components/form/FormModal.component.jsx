import React from 'react';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { createStructuredSelector } from 'reselect';

import RegisterFormCtxProvider from '../form/RegisterForm.provider';
import {
  showModal,
  setCurrentModal,
  hideModal
} from '../../redux/reducers/modal.reducer';
import { selectModalHidden } from '../../redux/selectors/modal.selectors';

import UIButton from '../core-ui/button/UIButton';
import Modal from '../modal/Modal.component';
import SignInForm from '../form/SignInForm.component';
import RegisterForm from '../form/RegisterForm.component';

import './FormModal.styles.scss';
import Logo from '../../assets/logo-white.png';

const mapStateToProps = createStructuredSelector({
  modalHidden: selectModalHidden
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal()),
  hideModal: () => dispatch(hideModal()),
  setModalName: modalName => dispatch(setCurrentModal(modalName))
});
const FormModal = ({
  signin,
  register,
  modalHidden,
  showModal,
  setModalName,
  style,
  ...props
}) => {
  const fadeUp = useTransition(!modalHidden, null, {
    from: { opacity: 1, transform: 'translate3d(0, 20%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -20%, 0' },
    config: { mass: 1, tension: 210, friction: 15 }
  });

  const toSignin = e => {
    e.stopPropagation();
    setModalName('signin');
    showModal();
  };
  const toRegister = e => {
    e.stopPropagation();
    setModalName('register');
    showModal();
  };

  return fadeUp.map(({ item, key, props: anim }) => {
    return item ? (
      <animated.div className="form-modal" style={anim} key={key}>
        <div className="form-modal__side">
          <img src={Logo} alt="logo" className="form-modal__logo-img"></img>
          <h2 className="form-modal__heading form-modal__heading--1">
            {register ? 'Welcome to Natours !' : 'Welcome back !'}
          </h2>
          <h3 className="form-modal__heading form-modal__heading--2 ">
            {signin
              ? `Don't have a natours account ? Sign up using your email and password.`
              : 'Already have an account. Log in using your email and password.'}
          </h3>
          <UIButton
            utilCls="u-mt-sm"
            modifier="submit-bg"
            onClick={signin ? toRegister : toSignin}
          >
            {signin ? 'sign up now' : 'log in'}
          </UIButton>
        </div>
        <div className="form-modal__content">
          {register ? (
            <RegisterFormCtxProvider>
              <RegisterForm {...props} />
            </RegisterFormCtxProvider>
          ) : (
            <SignInForm {...props} />
          )}
        </div>
      </animated.div>
    ) : null;
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal(FormModal));
