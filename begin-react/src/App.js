import React from 'react';
import Hello from './Hello';
import './App.css';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true}></Hello>
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
