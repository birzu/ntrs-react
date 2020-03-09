import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import './FormError.styles.scss';

const FormError = ({ name, errors }) => {
  return (
    <div className="form-error">
      <ErrorMessage name={name} errors={errors}>
        {({ message }) => <div className="form-error__msg">{message}</div>}
      </ErrorMessage>
    </div>
  );
};

export default FormError;
