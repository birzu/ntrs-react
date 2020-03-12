import React from 'react';

// UI CONTAINER WITH A PREDIFINED GRID STYLE
// grid style can be overrode with styleOverride prop
/**
 * styleOverride?: {
 * 	display: "grid"
 * 	gridTemplateColumns: <string>
 * 	gridTemplateRows: <string>
 * 	...otherStyles
 * }
 */
export default function({ children, styleOverride }) {
  return (
    <div style={styleOverride} className="ui-grid">
      {children}
    </div>
  );
}
