/* eslint-disable no-template-curly-in-string */
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users/',
  );
  return response.data;
}

function Users_Reducer() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <diiv>에러발생</diiv>;
  if (!users) return <button onClick={refetch}>불러오기</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Users_Reducer;
