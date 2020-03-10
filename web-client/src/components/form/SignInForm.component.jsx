import React from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import FormGroup from '../form-group/FormGroup.component';
import CustomButton from '../custom-button/CustomButton.component';

import './Form.styles.scss';

const SignInForm = ({ onDismiss }) => {
  const { errors, register, handleSubmit } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div
      className="signin-form-modal-wrapper"
      onClick={e => e.stopPropagation()}
    >
      <div
        className="signin-form__modal-btn-dismiss"
        onClick={() => onDismiss()}
      >
        &#10005;
      </div>

      <h2 className="heading-2 heading-2--secondary signin-form__modal-heading">
        Log in to your natours account
      </h2>

      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          clsPrefix="signin-form"
          inputType="email"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Email is required' },
            validate: val => isEmail(val) || 'Invalid email'
          })}
        />
        <FormGroup
          clsPrefix="signin-form"
          inputType="password"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Password is required' }
          })}
        />
        <CustomButton cls="ntrs-btn ntrs-btn--success ntrs-btn--success--wide signin-form__btn">
          Sign in
        </CustomButton>
      </form>

      <div className="to-register-wrapper">
        <div className="to-register__text">
          Don't have an account ?<div className="to-register__btn">Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
