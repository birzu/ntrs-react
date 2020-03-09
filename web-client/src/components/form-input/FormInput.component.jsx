import React, { Fragment } from 'react';

import './FormInput.styles.scss';

const FormInput = ({
  inputRef,
  children,
  inputCls,
  labelCls,
  label,
  id,
  ...props
}) => (
  <Fragment>
    <input className={inputCls} ref={inputRef} id={id} {...props} />
    {label ? (
      <label className={labelCls} htmlFor={id}>
        {children}
        {label}
      </label>
    ) : null}
  </Fragment>
);

export default FormInput;
