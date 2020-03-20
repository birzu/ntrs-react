import React, { createContext, useState, useCallback } from 'react';

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

const RegisterFormCtxProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const prevStep = useCallback(() => setCurrentStep(0), []);
  const nextStep = useCallback(() => setCurrentStep(1), []);
  const updateFormData = useCallback(
    data => setFormData({ ...formData, ...data }),
    [formData]
  );

  return (
    <RegisterFormContext.Provider
      value={{
        nextStep: nextStep,
        prevStep,
        updateFormData,
        currentStep,
        formData
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export default RegisterFormCtxProvider;
