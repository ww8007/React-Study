import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid red',
    padding: 16,
  };
  return <div style={style}>{children}</div>;
}

export default Wrapper;
