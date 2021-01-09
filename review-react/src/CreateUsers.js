import React from 'react';

function CreateUsers({ id, pw, onCreate, onChange }) {
  return (
    <div>
      <input name="id" placeholder="input ID" onChange={onChange} value={id} />
      <input name="pw" placeholder="input PW" onChange={onChange} value={pw} />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUsers;
