import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.id}</b> <span>{user.pw}</span>
    </div>
  );
}

function UserLists({ user }) {
  return (
    <>
      {user.map((user, index) => (
        <User user={user} key={user.i}></User>
      ))}
    </>
  );
}

export default UserLists;
