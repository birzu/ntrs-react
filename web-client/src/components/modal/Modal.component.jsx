import React from 'react';
import ReactDOM from 'react-dom';

const Modal = InnerModal => props => {
  ReactDOM.createPortal(
    <div className="modal-wrapper">
      <InnerModal {...props} />
    </div>,
    document.getElementById('reactPortal')
  );
};

export default Modal;
