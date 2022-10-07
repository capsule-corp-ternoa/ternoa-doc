import React from 'react';

export default function Highlight({children}) {
  return (
    <span
      style={{
        backgroundColor: '#840cc6',
        borderRadius: '3px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}