import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
    </div>
  );
}

function UserList({ user }) {
  return (
    <div>
      {user.map((user, index) => (
        <User user={user} key={user.id}></User>
      ))}
    </div>
  );
}

export default UserList;
