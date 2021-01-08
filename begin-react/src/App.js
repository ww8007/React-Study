import React, { useRef, useState } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';

function App() {
  const [input, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...input,
      [name]: value,
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'jang',
      email: 'wshmin@naver.com',
    },
    {
      id: 2,
      username: 'hi',
      email: 'good@naver.com',
    },
    {
      id: 3,
      username: 'bye',
      email: 'bye@naver.com',
    },
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));
    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList user={users}></UserList>
    </>
  );
}

export default App;
