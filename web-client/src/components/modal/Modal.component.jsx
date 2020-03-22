import React, { useContext, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalContext,
  useModalAnimation
} from '../../providers/Modal.provider';

const Modal = () => {
  const { modalHidden, hideModal, modal } = useContext(ModalContext);
  const fadeUp = useModalAnimation();
  const Modal = modal.current;

  return ReactDOM.createPortal(
    <Fragment>
      {!modalHidden ? (
        <div className="modal-wrapper" onClick={hideModal}>
          {fadeUp.map(({ item, props: style, key }) =>
            item ? (
              <Modal animation={style} onDismiss={hideModal} key={key} />
            ) : null
          )}
        </div>
      ) : null}
    </Fragment>,
    document.getElementById('reactPortal')
  );
};

export default Modal;
