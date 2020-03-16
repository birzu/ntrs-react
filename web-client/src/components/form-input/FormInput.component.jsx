import React, { Fragment } from 'react';

import './FormInput.styles.scss';

const FormInput = ({
  inputRef,
  children,
  inputCls,
  labelCls,
  label,
  id,
  disabled,
  ...props
}) => (
  <Fragment>
    <input
      className={inputCls}
      ref={inputRef}
      id={id}
      {...props}
      disabled={disabled}
      onClick={e => e.stopPropagation()}
    />
    {label ? (
      <label
        onClick={e => e.stopPropagation()}
        className={labelCls}
        htmlFor={id}
      >
        {children}
        {label}
      </label>
    ) : null}
  </Fragment>
);

export default FormInput;
