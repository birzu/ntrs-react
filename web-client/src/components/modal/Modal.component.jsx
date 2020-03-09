import React from 'react';
import ReactDOM from 'react-dom';

const Modal = InnerModal => ({ hideModal, ...props }) => {
  return ReactDOM.createPortal(
    <div className="modal-wrapper" onClick={() => hideModal()}>
      {<InnerModal {...props} onDismis={hideModal} />}
    </div>,
    document.querySelector('#reactPortal')
  );
};

export default Modal;
