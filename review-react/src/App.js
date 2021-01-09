import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [input, setInputs] = useState({
    id: '',
    pw: '',
  });
  const { id, pw } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...input,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      i: 1,
      id: 'ww8007',
      pw: '123',
    },
    {
      i: 2,
      id: 'ww8007',
      pw: '123',
    },
    {
      i: 3,
      id: 'ww8007',
      pw: '123',
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      i: nextId.current,
      id,
      pw,
    };
    setUsers(users.concat(user));
    setInputs({
      id: '',
      pw: '',
    });
    nextId.current += 1;
  };
  return <div></div>;
}

export default App;
