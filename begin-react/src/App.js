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
      active: true,
    },
    {
      id: 2,
      username: 'hi',
      email: 'good@naver.com',
      active: false,
    },
    {
      id: 3,
      username: 'bye',
      email: 'bye@naver.com',
      active: false,
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

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList user={users} onRemove={onRemove} onToggle={onToggle}></UserList>
    </>
  );
}

export default App;
