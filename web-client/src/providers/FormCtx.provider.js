import React, { useRef, useState, useCallback, useMemo } from 'react';

export const FormContext = React.createContext({
  currentForm: '',
  setToSigninForm: () => {},
  setToRegisterForm: () => {}
});

const FormCtxProvider = ({ children }) => {
  const VALID_FORMS = useRef(['signin', 'register']);
  const [currentForm, setCurrentForm] = useState('');

  const setToSigninForm = useCallback(
    () => setCurrentForm(VALID_FORMS.current[0]),
    [setCurrentForm]
  );
  const setToRegisterForm = useCallback(
    () => setCurrentForm(VALID_FORMS.current[1]),
    [setCurrentForm]
  );

  const memoizedVal = useMemo(
    () => ({ currentForm, setToRegisterForm, setToSigninForm }),
    [currentForm, setToSigninForm, setToRegisterForm]
  );

  return (
    <FormContext.Provider value={memoizedVal}>{children}</FormContext.Provider>
  );
};

export default FormCtxProvider;
