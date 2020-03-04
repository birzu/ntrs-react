import React from 'react';

const SvgIconSelector = ({ icName, cls }) => (
  <svg className={cls}>
    <use href={`/icon-set.svg#ic-${icName}`}></use>
  </svg>
);

export default SvgIconSelector;
