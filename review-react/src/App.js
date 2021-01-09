import React, { useState, useRef } from 'react';
import './App.css';
import CreateUsers from './CreateUsers';
import UserLists from './UserLists';

function App() {
  const [input, setInputs] = useState({
    id: '',
    pw: '',
  });
  const { id, pw } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
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
  return (
    <>
      <CreateUsers
        id={id}
        pw={pw}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUsers>
      <UserLists user={users}></UserLists>
    </>
  );
}

export default App;
