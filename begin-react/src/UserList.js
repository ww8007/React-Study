import React from 'react';

function User({ user, onRemove }) {
  const { username, email, id } = user;
  return (
    <div>
      <b>{username}</b> <span>{email}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function UserList({ user, onRemove }) {
  return (
    <div>
      {user.map((user, index) => (
        <User user={user} key={user.id} onRemove={onRemove}></User>
      ))}
    </div>
  );
}

export default UserList;
