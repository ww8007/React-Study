import React, { createContext, useContext, useState } from 'react';

const Mycontext = createContext('defaultValue');

function Child() {
  const text = useContext(Mycontext);
  return <div>안녕하세요? {text}</div>;
}

function Parent() {
  return <Child></Child>;
}

function GrandParent() {
  return <Parent></Parent>;
}

function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <Mycontext.Provider value={value ? 'GOOD' : 'BAD'}>
      <GrandParent></GrandParent>
      <button onClick={() => setValue(!value)}>click me</button>
    </Mycontext.Provider>
  );
}

export default ContextSample;
