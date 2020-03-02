import React from 'react';

const CustomButton = ({ cls, children, type, onClick }) => {
  return (
    <button className={cls} type={type} onClick={onClick}>
      <span className="btn-inner-span"></span>
      {children}
    </button>
  );
};

export default CustomButton;
