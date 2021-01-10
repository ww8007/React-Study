import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;
  useEffect(() => {
    console.log(user);
  });
  return (
    <div>
      <b
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>
      &nbsp;
      <span>{email}</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function UserList({ user, onRemove, onToggle }) {
  return (
    <div>
      {user.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        ></User>
      ))}
    </div>
  );
}

export default UserList;
