import React, { useState } from 'react';

function InputSample() {
  const [input, setInput] = useState({
    name: '',
    nickname: '',
  });
  const { name, nickname } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const onReset = () => {
    setInput({
      name: '',
      nickname: '',
    });
  };
  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
