import React from 'react';
import ReactDOM from 'react-dom';

const Modal = InnerModal => ({ ...props }) => {
  return ReactDOM.createPortal(
    <div className="modal-wrapper">{<InnerModal {...props} />}</div>,
    document.querySelector('#reactPortal')
  );
};

export default Modal;
