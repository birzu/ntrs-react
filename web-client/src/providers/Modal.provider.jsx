import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useContext
} from 'react';

import { useTransition } from 'react-spring';
import FormModal from '../components/form/FormModal.component';
import CtaModal from '../components/cta-modal/CtaModal.component';

export const ModalContext = React.createContext({
  showModal: () => {},
  hideModal: () => {},
  setCurrentModal: () => {},
  modalHidden: undefined,
  modal: null,
  showAuthModal: () => {},
  showCtaModal: () => {}
});

export const useModalAnimation = () => {
  const { modalHidden } = useContext(ModalContext);
  const fadeUp = useTransition(!modalHidden, null, {
    from: { opacity: 1, transform: 'translate3d(-50%, -30%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(-50%, -50%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, -30%, 0' },
    config: { mass: 1, tension: 210, friction: 15 }
  });

  return fadeUp;
};

const ModalCtxProvider = ({ children }) => {
  const modal = useRef(null);
  const [modalHidden, setModalHidden] = useState(true);

  const avaliableModals = useRef({
    auth: FormModal,
    cta: CtaModal
  });
  const showModal = useCallback(() => setModalHidden(false), [setModalHidden]);
  const hideModal = useCallback(() => setModalHidden(true), [setModalHidden]);

  const setCurrentModal = useCallback(modalName => {
    modal.current = avaliableModals.current[modalName];
  }, []);

  const showAuthModal = useCallback(() => {
    setCurrentModal('auth');
    showModal();
  }, [setCurrentModal, showModal]);

  const showCtaModal = useCallback(() => {
    setCurrentModal('cta');
    showModal();
  }, [setCurrentModal, showModal]);

  const memoizedVal = useMemo(
    () => ({
      modal,
      modalHidden,
      setCurrentModal,
      showModal,
      hideModal,
      showAuthModal,
      showCtaModal
    }),
    [
      modal,
      modalHidden,
      setCurrentModal,
      showModal,
      hideModal,
      showAuthModal,
      showCtaModal
    ]
  );

  return (
    <ModalContext.Provider value={memoizedVal}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalCtxProvider;
