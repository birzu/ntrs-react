import React from 'react';

import FormInput from '../form-input/FormInput.component';
import FormError from '../form-error/FormError.component';

const FORM_INPUT_TYPES = {
  text: {
    name: {
      label: 'Name',
      placeholder: 'Full Name'
    },
    username: {
      label: 'Username',
      placeholder: 'username'
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
  name,
  inputLabel,
  inputDisabled,
  children
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
    <div className={`${clsPrefix}__group`} onClick={e => e.stopPropagation()}>
      <FormInput
        id={`${clsPrefix}-input-${name ? name : inputType}`}
        label={inputLabel ? inputLabel : label}
        labelCls={`${clsPrefix}__label ${clsPrefix}__label--${
          inputCls ? inputCls : inputType
        }`}
        inputCls={`${clsPrefix}__input ${clsPrefix}__input--${
          inputCls ? inputCls : inputType
        }`}
        placeholder={placeholder}
        type={inputType}
        name={name ? name : inputType}
        inputRef={inputRef}
        disabled={inputDisabled}
      >
        {children}
      </FormInput>
      <div className={`${clsPrefix}__error ${clsPrefix}__error--${inputType}`}>
        <FormError name={name ? name : inputType} errors={errors} />
      </div>
    </div>
  );
};

export default FormGroup;
