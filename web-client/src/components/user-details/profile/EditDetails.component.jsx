import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import FormGroup from '../../form-group/FormGroup.component';
import UIButton from '../../core-ui/button/UIButton';
import SvgIconSelector from '../../svg-icon-selector/SvgIconSelector.component';

import './ProfileForm.styles.scss';

// temp
import UserPhoto from '../../../assets/user-12.jpg';
import FormInput from '../../form-input/FormInput.component';
import FormError from '../../form-error/FormError.component';

const EditDetails = () => {
  // emailRef is needed to focus email field onClick
  const emailRef = useRef(null);

  // default form values
  const [defaultEmail, setDefaultEmail] = useState('john@example.com');
  const [defaultUserName, setDefaultUserName] = useState('john');
  // state variable to toggle email field disabled attribute
  // const [isEmailDisabled, setEmailDisabled] = useState(true);
  // state variable to toggle submit btn disabled attribute
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  // state variable to store the filename from the filelist
  const [userImgFileName, setUserImgFileName] = useState('');

  // initialize required form variables
  const { errors, handleSubmit, register, getValues } = useForm({
    defaultValues: {
      email: defaultEmail,
      username: defaultUserName
    }
  });

  // should submitBtn be disabled
  useEffect(() => {
    const currentEmail = getValues().email;
    const currentUsername = getValues().username;
    setSubmitDisabled(
      currentEmail === defaultEmail && currentUsername === defaultUserName
    );
  }, [defaultEmail, defaultUserName, getValues]);

  console.log(isSubmitDisabled);
  console.log(userImgFileName);

  return (
    <div className="edit-user-details" onClick={() => setEmailDisabled(true)}>
      <h2 className="edit-user-details__heading">Edit user profile</h2>
      <form
        onSubmit={handleSubmit(data => console.log(data))}
        className="edit-details-form"
      >
        <FormGroup
          inputType="email"
          clsPrefix="edit-details-form"
          inputRef={el => {
            register(el, {
              required: { value: true, message: 'Invalid email' },
              validate: val => isEmail(val) || 'Invalid email'
            });
            emailRef.current = el;
          }}
          errors={errors}
        >
          <span>
            <SvgIconSelector
              icName="check-circle"
              cls="edit-details-form__ic-verify"
            />
            verified
          </span>
        </FormGroup>
        <div className="edit-details-form__group">
          <input
            ref={register({
              required: { value: true, message: 'Invalid username' },
              minLength: {
                value: 4,
                message: 'Username must be at least 4 characters long'
              },
              maxLength: {
                value: 15,
                message: 'Username can be longer than 15 characters'
              },
              pattern: {
                value: /^[A-Za-z0-9_]{1,15}$/,
                message:
                  'Username can only contain letters, numbers and underscore'
              }
            })}
            className="edit-details-form__input edit-details-form__input--username"
            name="username"
            type="text"
          />
          <label className="edit-details-form__label edit-details-form__label--username">
            Username
          </label>
          <div className="edit-details-form__error">
            <FormError name="username" errors={errors} />
          </div>
        </div>
        {
          // profile picture with file input //

          <div
            className="edit-details-form__group edit-details-form__group--file-inp"
            onClick={e => e.stopPropagation()}
          >
            <div className="edit-details-form__profile-img-wrapper">
              <img
                className="edit-details-form__profile-img"
                src={UserPhoto}
                alt="john doe"
              ></img>
            </div>
            <label
              className="edit-details-form__profile-img-label"
              htmlFor="edit-details-form-profile-img"
            >
              <SvgIconSelector
                icName="upload"
                cls="edit-details-form__ic-upload"
              />
              Upload a new photo
            </label>
            {/* DISPLAY THE FILENAME 
							
							userImgFileName ? (
              <div className="edit-details-form__profile-img-fname">
                {userImgFileName
                  .split('')
                  .filter((val, idx) => idx < 15)
                  .join('') + '...'}
              </div>
						) : null
						*/}
            <input
              type="file"
              onChange={e => {
                e.stopPropagation();
                setUserImgFileName(e.target.files[0].name);
              }}
              id="edit-details-form-profile-img"
              className="edit-details-form__upload-img-input"
              name="profile-img"
              accept="image/*"
            />
          </div>
        }
        <div
          className="edit-details-form__btn-wrapper"
          onClick={e => e.stopPropagation()}
        >
          <input
            type="submit"
            className="edit-details-form__btn-submit"
            value="Update profile"
          />
        </div>
      </form>
    </div>
  );
};

export default EditDetails;
