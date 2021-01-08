import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
    </div>
  );
}

function UserList() {
  const users = [
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
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id}></User>
      ))}
    </div>
  );
}

export default UserList;
