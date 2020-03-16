import React from 'react';
import { useForm } from 'react-hook-form';

import FormGroup from '../../form-group/FormGroup.component';

import './ProfileForm.styles.scss';

const EditPassword = () => {
  const { errors, handleSubmit, register, watch } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <div className="edit-paswd">
      <div className="edit-paswd__heading-wrapper">
        <h2 className="edit-paswd__heading">Change password</h2>
      </div>
      <form className="edit-paswd-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          clsPrefix="edit-paswd-form"
          inputType="password"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Current password is required' }
          })}
          inputLabel="Current password"
        />
        <FormGroup
          clsPrefix="edit-paswd-form"
          inputType="password"
          name="new-password"
          inputLabel="New password"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Invalid password field value' },
            minLength: {
              value: 8,
              message:
                'Weak password. Please use a password with at least 8 characters'
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
              message:
                'Weak password. Please use at least one uppercase letter and one number'
            }
          })}
        />
        <FormGroup
          clsPrefix="edit-paswd-form"
          inputType="password"
          name="passwd-confirm"
          inputLabel="Confirm new password"
          errors={errors}
          inputRef={register({
            required: { value: true, message: 'Please confirm the password' },
            validate: val =>
              watch('new-password') === val || 'Passwords do not match'
          })}
        />
        <div className="edit-paswd-form__btn-wrapper">
          <input
            type="submit"
            className="edit-paswd-form__btn-submit"
            value="Update password"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
