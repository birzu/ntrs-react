import React, { Fragment, useState, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import RegisterFormCtxProvider, {
  RegisterFormContext
} from './RegisterForm.provider';

import FormGroup from '../form-group/FormGroup.component';
import FormInput from '../form-input/FormInput.component';
import UIButton from '../core-ui/button/UIButton';
import FormError from '../form-error/FormError.component';

const RegisterForm = ({ onDismiss }) => {
  const {
    nextStep,
    prevStep,
    currentStep,
    formData,
    updateFormData
  } = useContext(RegisterFormContext);

  const FormStepOne = ({ nextStep, updateFormData }) => {
    const { errors, handleSubmit, register } = useForm({
      defaultValues: formData
    });

    const onSubmit = data => {
      console.log(data);
      // setState
      updateFormData(data);
      // call nextStep
      nextStep();
    }; // temp

    return (
      <form
        className="register-form register-form--step-2"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <UIButton modifier="form-step-next" type="submit">
          Next <span>&#10142;</span>
        </UIButton>
      </form>
    );
  };

  const FormStopTwo = ({ prevStep, updateFormData }) => {
    const { errors, handleSubmit, register, watch } = useForm({
      defaultValues: formData
    });

    const onSubmit = data => {
      console.log(data);
      updateFormData(data);
    }; // temp

    return (
      <Fragment>
        <form
          className="register-form register-form--step-two"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              id="register-form-input-psconfirm"
              type="password"
              name="passwordConfirm"
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
            <div className="register-form__error">
              <FormError name="passwordConfirm" errors={errors} />
            </div>
          </div>
          <input
            type="submit"
            value="Register"
            className="register-form__btn-submit"
          />
        </form>
        <div className="register-form__btns" onClick={e => e.stopPropagation()}>
          <UIButton modifier="form-step-back" onClick={prevStep}>
            <span>&#10141;</span> Go back
          </UIButton>
        </div>
      </Fragment>
    );
  };

  const formSteps = [FormStepOne, FormStopTwo];

  const renderCurrentFormStep = cStep => {
    const Step = formSteps[cStep];
    return (
      <Step
        nextStep={nextStep}
        prevStep={prevStep}
        updateFormData={updateFormData}
      />
    );
  };

  console.log(formData);

  return (
    <div
      className="register-form-modal-wrapper"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="heading-2 heading-2--secondary register-form__modal-heading">
        Sign up
      </h2>

      <div
        className="register-form__modal-btn-dismiss"
        onClick={() => onDismiss()}
      >
        &#10005;
      </div>
      {renderCurrentFormStep(currentStep)}
    </div>
  );
};

export default RegisterForm;
