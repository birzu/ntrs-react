import React from 'react';
import { useForm } from 'react-hook-form';

import FormError from '../form-error/FormError.component';
import FormInput from '../form-input/FormInput.component';
import CustomButton from '../custom-button/CustomButton.component';

import './CtaModal.styles.scss';

const CtaModal = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div className="cta-modal">
      <h2 className="cta-modal__heading heading-2 heading-2--secondary">
        Book your next adventure !
      </h2>
      <form className="cta-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="cta-form__group">
          <FormInput
            type="email"
            id="cta-form-input-email"
            label="Email"
            inputCls="cta-form__input cta-form__input--email"
            name="email"
            labelCls="cta-form__label cta-form__label--email"
            placeholder="Email"
            inputRef={register({
              required: { value: true, message: 'Email is required' }
            })}
          />

          <div className="cta-form__error cta-form__error--email">
            <FormError name="email" errors={errors} />
          </div>
        </div>

        <div className="cta-form__group">
          <FormInput
            type="text"
            id="cta-form-input-fullname"
            label="Name"
            inputCls="cta-form__input cta-form__input--fullname"
            name="fullname"
            placeholder="Full Name"
            inputRef={register({
              required: { value: true, message: 'Name is required' },
              pattern: {
                value: /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/,
                message: 'Please provide your full name'
              }
            })}
            labelCls="cta-form__label cta-form__label--fullname"
          />

          <div className="cta-form__error cta-form__error--fullname">
            <FormError name="fullname" errors={errors} />
          </div>
        </div>

        <div className="cta-form__radio-group">
          <FormInput
            type="radio"
            id="cta-form-input-radio-1"
            label="small groups"
            inputCls="cta-form__input-radio cta-form__input-radio--1"
            name="group size"
            labelCls="cta-form__radio-label  cta-form__radio-label--1"
          >
            <span className="cta-form__radio-button"></span>
          </FormInput>
          <FormInput
            type="radio"
            id="cta-form-input-radio-2"
            label="large groups"
            inputCls="cta-form__input-radio cta-form__input-radio--2"
            name="group size"
            labelCls="cta-form__radio-label  cta-form__radio-label--2"
          >
            <span className="cta-form__radio-button"></span>
          </FormInput>
        </div>
        <CustomButton
          cls="cta-form__btn cta-form__btn--submit ntrs-btn ntrs-btn--success"
          type="submit"
        >
          Submit
        </CustomButton>
      </form>
    </div>
  );
};

export default CtaModal;
