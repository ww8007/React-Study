/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';
async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users/',
  );
  return response.data;
}

function Users_Reducer() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload, run } = useAsync({
    deferFn: getUsers,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <diiv>에러발생</diiv>;
  if (!users) return <button onClick={run}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId}></User>}
    </>
  );
}

export default Users_Reducer;
