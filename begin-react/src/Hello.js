import React from 'react';

function HelloWolrd({ color, name, isSpecial }) {
  console.log();
  return (
    <div
      style={{
        color,
      }}
    >
      <b>{isSpecial ? '스페셜' : '낫스페셜'}</b>
      안녕하세요{name}
    </div>
  );
}

HelloWolrd.defaultProps = {
  name: '이름없음',
};
export default HelloWolrd;
