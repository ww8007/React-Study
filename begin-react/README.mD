# REACT

# 사용이유

규모가 커지게 되면 DOM 다양해 지고 코드가 난잡하게 만들어짐
유지보수가 어려워짐
Ember, Backbone, Angular JS 다른 예제들
Update 개념이 좀 더 쉬워짐

- Virtual DOM
  상태가 update 되면 virtual dom과

Component -> ouput 개념을 만들어줌

### 작업 환경

pwd 현재 경로 탐색

### 컴포넌트 생성

```js
import React from 'react';

function HelloWolrd() {
  return <div>안녕하세요</div>;
}

export default HelloWolrd;
```

기본적 생성

1. 함수

2. class

### index.js

RactDOM 페이지에서 아이디가 root를 찾아서 삽입

### jsx

babel js.io

jsx -> javascript

1. 테그는 닫혀 있어야 함

```jsx
<div></div>
```

- input tag
  self closing tag

```jsx
<input />
```

2. 두개 이상의 테그는 하나의 테그로 감싸져 있어야 함

1. div로 감싸기

```jsx
<div>
    <Hello />
    <div>안녕하세요.</div>
<div>
```

2. Fragment

```jsx
<>
  <Hello />
  <div>안녕히계세요</div>
</>
```

3. 괄호로 감싸기

```jsx
{
  const name = 'react';
  return (
    <>
      <Hello />
      <div>{name}</div>
    </>
  );
}
```

### css

className 으로 작성 해야 한다
-> 사용은 할 수 있지만 오류 남

1. style 사용시
   **객체**로 선언해서 사용

````jsx
const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24,
    padding: '1rem',
  };
```

2. 아래와 같이 className으로 선언해 주고 사용 해줘야 함
```jsx
<div className="gray-box"></div>
````

### 주석

{/_ 어쩌고 저쩌고 _/}
테그 안에서는 //로 표현 가능

### props

properties

특정 값을 전달해주고 싶을 때 사용

부모 -> 자식

비구조 할당 , 구조 문법

```jsx
function HelloWolrd({ color, name }) {
  console.log();
  return (
    <div
      style={{
        color,
      }}
    >
      안녕하세요{name}
    </div>
  );
}
```

defaultProps

```jsx
HelloWolrd.defaultProps = {
  name: '이름없음',
};
```

- props는 값을 파라미터로 받아 올 수 있음
- 비구조 할당을 통해 받아오면 인자에 {설정값}을 선언하여 받아올 수 있음
- 기본 값을 설정하기 위해서는 defalutProps
- children : 테그와 테그 사이에 넣는 내용을 의미함

### 조건부 랜더링

{null}, {undefined의}, {false} 경우 출력되지 않지만
{0}의 경우는 출력되게 됨

1. 사망 연산자

- ```jsx
  {
    isSpecial ? <b>\*</b> : null;
  }
  ```

2. && 연산자

- 조건 값이 참 아니면 거짓인 경우에만 사용

```jsx
{
  isSpecial && <b>*</b>;
}
```

- isSpeical{true}의 값이 bool 인 경우 isSpeical로만 해줘도 true로 인식하게 됨

### useState를 통한 동적 상태 관리
