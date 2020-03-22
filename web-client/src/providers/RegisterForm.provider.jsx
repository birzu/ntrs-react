import React, { createContext, useState, useCallback, useMemo } from 'react';

export const RegisterFormContext = createContext({
  currentStep: 0,
  formData: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  },
  updateFormData: data => {},
  nextStep: () => {},
  prevStep: () => {}
});

const DEFAULT_FORM_DATA = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

const RegisterFormCtxProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const prevStep = useCallback(() => setCurrentStep(0), [setCurrentStep]);
  const nextStep = useCallback(() => setCurrentStep(1), [setCurrentStep]);
  const updateFormData = useCallback(
    data => setFormData({ ...formData, ...data }),
    [formData]
  );

  const memoizedVal = useMemo(
    () => ({
      nextStep,
      prevStep,
      updateFormData,
      currentStep,
      formData
    }),
    [currentStep, nextStep, prevStep, updateFormData, formData]
  );

  return (
    <RegisterFormContext.Provider value={memoizedVal}>
      {children}
    </RegisterFormContext.Provider>
  );
};
export default RegisterFormCtxProvider;
