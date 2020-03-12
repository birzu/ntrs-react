import React from 'react';
import ReactDOM from 'react-dom';

const Modal = InnerContent => ({ hideModal, ...props }) => {
  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <InnerContent onDismiss={hideModal} {...props} />
    </div>,
    document.getElementById('reactPortal')
  );
};

export default Modal;
