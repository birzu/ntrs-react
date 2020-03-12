import React from 'react';

export default function({ children, modifier, onClick, utilCls, style }) {
  return (
    <button
      className={`ui-btn ui-btn--${modifier} ${utilCls ? `${utilCls}` : ''}`}
      onClick={onClick}
      style={style ? style : {}}
    >
      <span className={`ui-btn__inner ui-btn--${modifier}__inner`}></span>
      {children}
    </button>
  );
}
