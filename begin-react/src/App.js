import React, { useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users) {
  console.log('활성 유저들 수 카운트 중');
  return users.filter((user) => user.active).length;
}

function App() {
  const [input, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = input;
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...input,
        [name]: value,
      });
    },
    [input],
  );
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

  const onCreate = useCallback(() => {
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
  }, [username, email, users]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users],
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user,
        ),
      );
    },
    [users],
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList user={users} onRemove={onRemove} onToggle={onToggle}></UserList>
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
