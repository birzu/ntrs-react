import React from 'react';

import FormInput from '../form-input/FormInput.component';
import FormError from '../form-error/FormError.component';

const FORM_INPUT_TYPES = {
  text: {
    name: {
      label: 'Name',
      placeholder: 'Full Name'
    }
  },

  email: {
    label: 'Email',
    placeholder: 'user@example.com'
  },

  password: {
    label: 'Password',
    placeholder: '•••••••••••'
  }
};

const FormGroup = ({
  clsPrefix,
  inputType,
  inputRef,
  inputCls,
  errors,
  name
}) => {
  const label =
    inputType === 'text'
      ? FORM_INPUT_TYPES['text'][name].label
      : FORM_INPUT_TYPES[inputType].label;
  const placeholder =
    inputType === 'text'
      ? FORM_INPUT_TYPES['text'][name].placeholder
      : FORM_INPUT_TYPES[inputType].placeholder;

  return (
    <div className={`${clsPrefix}__group`}>
      <FormInput
        id={`${clsPrefix}-input-${inputType}`}
        label={label}
        labelCls={`${clsPrefix}__label ${clsPrefix}__label--${
          inputCls ? inputCls : inputType
        }`}
        inputCls={`${clsPrefix}__input ${clsPrefix}__input--${
          inputCls ? inputCls : inputType
        }`}
        placeholder={placeholder}
        type={inputType}
        name={inputType}
        inputRef={inputRef}
      />
      <div
        className={`s${clsPrefix}__error s${clsPrefix}__error--${inputType}`}
      >
        <FormError name={inputType} errors={errors} />
      </div>
    </div>
  );
};

export default FormGroup;
