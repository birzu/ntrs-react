import { useContext, useCallback, useMemo } from 'react';
import { ModalContext } from '../providers/Modal.provider';
import { FormContext } from '../providers/FormCtx.provider';

export default function() {
  const { showAuthModal } = useContext(ModalContext);
  const { setToRegisterForm, setToSigninForm } = useContext(FormContext);
  const handleClickOnSignin = useCallback(() => {
    setToSigninForm();
    showAuthModal();
  }, [showAuthModal, setToSigninForm]);

  const handleClickOnRegister = useCallback(() => {
    setToRegisterForm();
    showAuthModal();
  }, [setToRegisterForm, showAuthModal]);

  return useMemo(() => ({ handleClickOnRegister, handleClickOnSignin }), [
    handleClickOnRegister,
    handleClickOnSignin
  ]);
}
