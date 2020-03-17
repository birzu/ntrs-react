import React from 'react';
import ReactDOM from 'react-dom';

const Modal = InnerContent => ({ hideModal, style, ...props }) => {
  return ReactDOM.createPortal(
    <div className="modal-wrapper" style={style}>
      <InnerContent style={style} onDismiss={hideModal} {...props} />
    </div>,
    document.getElementById('reactPortal')
  );
};

export default Modal;
