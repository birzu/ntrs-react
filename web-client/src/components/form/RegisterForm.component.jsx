import React from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import FormGroup from '../form-group/FormGroup.component';
import FormInput from '../form-input/FormInput.component';
import CustomButton from '../custom-button/CustomButton.component';

const RegisterForm = ({}) => {
  const { errors, handleSubmit, register, watch } = useForm();

  const onSubmit = data => console.log(data); // temp

  return (
    <div
      className="register-form-modal-wrapper"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="heading-2 heading-2--secondary register-form__modal-heading">
        Create a new natours account
      </h2>

      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          inputType="text"
          clsPrefix="register-form"
          errors={errors}
          name="username"
          inputRef={register({
            required: { value: true, message: 'Username is required' },
            minLength: {
              value: 4,
              message: 'Username can not be less than 4 characters in length'
            },
            maxLength: {
              value: 15,
              message: 'Username can not be more than 15 characters in length'
            },
            pattern: {
              value: /^[A-Za-z0-9_]{1,15}$/,
              message:
                'Username can only contain letters, numbers and underscore character'
            }
          })}
        />

        <FormGroup
          inputType="email"
          clsPrefix="register-form"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Email is required' },
            validate: val => isEmail(val) || 'Invalid email'
          })}
        />

        <FormGroup
          inputType="password"
          clsPrefix="register-form"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Password is required' },
            minLength: {
              value: 8,
              message: 'Password must be 8 characters long'
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
              message:
                'Password must have at least one uppercase letter, one lowercase letter and a number'
            }
          })}
        />
        {
          // Can not use FormGroup for password confirmation because need to watch the value on password field for validation
        }
        <div className="register-form__group">
          <FormInput
            type="password"
            name="password-confirm"
            inputCls="register-form__input register-form__input--psconfirm"
            label="Confirm Password"
            labelCls="register-form__label register-form__label--psconfirm"
            placeholder="•••••••••••"
            inputRef={register({
              required: { value: true, message: 'Passwords must match' },
              validate: val =>
                val === watch('password') || 'Passwords must match'
            })}
          />
        </div>

        <CustomButton className="register-form__btn ntrs-btn ntrs-btn--secondary">
          Resister
        </CustomButton>
      </form>
      <div className="to-signin">
        <div className="to-signin__text">
          Already have an account, <div className="to-signin__btn">Log in</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
