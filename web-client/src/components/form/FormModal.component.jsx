import React, { useContext } from 'react';
import { animated } from 'react-spring';

import RegisterFormCtxProvider from '../../providers/RegisterForm.provider';
import { FormContext } from '../../providers/FormCtx.provider';

import UIButton from '../core-ui/button/UIButton';
import SignInForm from '../form/SignInForm.component';
import RegisterForm from '../form/RegisterForm.component';

import './FormModal.styles.scss';
import Logo from '../../assets/logo-white.png';

const FormModal = ({ animation, onDismiss }) => {
  const { currentForm, setToRegisterForm, setToSigninForm } = useContext(
    FormContext
  );
  return (
    <animated.div
      className="form-modal"
      style={animation}
      onClick={e => e.stopPropagation()}
    >
      <div className="form-modal__side">
        <img src={Logo} alt="logo" className="form-modal__logo-img"></img>
        <h2 className="form-modal__heading form-modal__heading--1">
          {currentForm === 'register'
            ? 'Welcome to Natours !'
            : 'Welcome back !'}
        </h2>
        <h3 className="form-modal__heading form-modal__heading--2 ">
          {currentForm === 'signin'
            ? `Don't have a natours account ? Sign up using your email and password.`
            : 'Already have an account. Log in using your email and password.'}
        </h3>
        <UIButton
          utilCls="u-mt-sm"
          modifier="submit-bg"
          onClick={
            currentForm === 'signin' ? setToRegisterForm : setToSigninForm
          }
        >
          {currentForm === 'signin' ? 'Sign up now' : 'Log in'}
        </UIButton>
      </div>
      <div className="form-modal__content">
        {currentForm === 'register' ? (
          <RegisterFormCtxProvider>
            <RegisterForm onDismiss={onDismiss} />
          </RegisterFormCtxProvider>
        ) : (
          <SignInForm onDismiss={onDismiss} />
        )}
      </div>
    </animated.div>
  );
};

export default FormModal;
