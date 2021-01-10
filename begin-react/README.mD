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

- div로 감싸기

```jsx
<div>
    <Hello />
    <div>안녕하세요.</div>
<div>
```

- Fragment

```jsx
<>
  <Hello />
  <div>안녕히계세요</div>
</>
```

- 괄호로 감싸기

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

react 16.8 hooks -> 동적 상태 구현 가능

- 자바 스크립트 화살표 함수  
   function 표현에 비해서 구문이 짧고 자신의 this, argumnets, sunper 또는 new.target 바인딩 x
  익명함수

react에는 함수가 대문자로 들어감

- event 선언 주의 사항
  함수를 넣어주는 것 이지 호출해주는 개념이 아님
  -> 랜더링 될 때 함수가 호출이 되어버림
  html의 경우 함수를 호출해주기도 하는데 react는 그렇지 않음

- 배열 비구조 할당, 비구조로 useState 배열 생성

```jsx
const [number, setNumber] = useState(0);
```

- useState

바뀌는 값 관리 가능

파라미터로 사용

배열 반환

첫번째 원소 : 바뀌는 값
두번째 원소 : 함수

- 함수형 업데이트를 사용
  로직을 정의하는 함수 사용 가능
  update 함수를 사용가능 -> **최적화**와 관련 있음
  ```jsx
  setNumber((preNum) => preNum - 1);
  ```

### react input 상태 관리

e.target : 이벤트가 발생한 돔에 대한 값을 가지고 있음
e.target.value 로 선언시 값을 볼 수 있게 됨

함수를 여러개 사용하고 useState의 첫번째 인자가 게속 최신화가 되게 하는 방법은
e를 사용한 파라미터 부분에 value 값을 설정해 주면 된다.

```jsx
<input onChange={onChange} value={text} />
```

#### 여러개의 input 상태 관리

useState 여러개 선언하거나 그 때마다 함수를 생성한다고 생각 할 수 있지만
그런 개념이 아니고 객체를 선언하여 추출하여 사용하는 방법이 더 효율적 이다

- react 객체 update 방법

name, value를 추출하고 선언
불변성을 유지하면서 객체를 update 해줘야함
객체 상태를 update할 때는 spread(...) 사용해서 update를 해줘야 함

```jsx
setInput({
  ...input,
  [name]: value,
});
```

### useRef로 특성 DOM 선택하기

함수 컴포넌트 ref -> useRef
class -> createRef()

class 나중에 -> 중요도 down

input 예시로 들 때 focus가 초기화에 남아있는 걸 옮기고 싶다면

1. useRef 선언
   ```jsx
   import React, { useState, useRef } from 'react';
   ```
2. useRef 호출
   ```jsx
   const nameInput = useRef();
   ```
3. 사용하고 싶은 곳에 ref={nameInput}

### 배열 렌더링 하기

javascript map

arrary.map(기존배열)
기존 배열을 다른 배열로 바꿔줌

id 값이 존재 하지 않아서 key 값을 설정하지 못할 시
map(1, 2) 2번째 값에 인덱스를 설정할 수 있는데 경고만 사라질 뿐 성능적 개선은 없음

- key 의 역할
  key 값을 사용하지 않으면 메모리적 낭비가 생기게 된다
  자신이 몇번 째 인덱스인줄만 알지 값을 가지고 있는 것을 인식하지 못함

### useRef로 컴포넌트 안의 변수 만들기

useState -> component 다시 렌더링 됨
useRef -> 특정 돔을 선택 해야할 때 사용
컴포넌트가 리렌더링 될 때
setTimeout, setInterval의 id 외부라이브러리 사용
Scroll 위치

useRef로 바꾼 값은 리렌더링 되도 component가 알아차리지 못함

```jsx
const nextId = useRef(4);

const onCreate = () => {
  console.log(nextId.current); //4
  nextId.current += 1;
};
return <UserList users={users}></UserList>;
```

위와 같이 선언하면 컴포넌트가 rerendering 되어도 useRef의 값은 4로 남아있고
onCreate 함수가 호출되어야만 값이 변하게 된다.

- useRef의 값이 바뀌어도 component가 알지 못함

### 배열 항목 추가하기 방법

push sort 사용 불가

1. spread 연산자 사용
   ...users
   기존 배열은 수정하지 않으면서 복사해서 사용

   ```jsx
   const user = {
     id: nextId.current,
     username,
     email,
   };
   setUsers([...users, user]);
   ```

2. concat 함수 사용
   배열 여러개를 하나의 배열로 합쳐줌
   하지만 새로운 배열이 생기게 되지는 않음

### 배열 항목 제거하기

onClick 함수 생성

바로 파라미터 받아 올 수 있도록

```js
<button onClick={() => onRemove(id)}>삭제</button>
```

위와 같이 안하고

```js
<button onClick={onRemove(id)}>삭제</button>
```

이렇게 선언하게 되면 랜더링 될 때 호출
-> 안 할경우 생성도 안되고 랜더링 될 때 모두 사라져 버림

- 불변성을 지켜가면서 새로운 배열을 생성하는 법
  filter
  filter 값이 만족하는 값만을 추출하게 됨
  ```js
  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  ```

### 배열 항목 수정하기

&nbsp; 공백생성

map 함수를 여기서도 사용 가능

배열에 있는 특정 item update 할 때에도 사용 가능

```js
const onToggle = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user,
    ),
  );
};
```

특정 객체를 수정해야 할 때 ...user 생성 후
user 값을 입력시켜주고 덮어씌워줌

- user.id === id -> user 복사 생성 후 active 값 반전
- user.id !== id -> 그냥 user 출력

### useEffect Hook

첫번 째 파라미터 : 함수
두번 째 파라미터 : deps
반환 함수 : 뒷 정리 전 호출 (cleaner 함수)
조회하거나 봐야할 함수 : deps에 호출

화면에 나타나거나 사라질 때, props의 상태가 변경 될 때
리렌더링 될 때 이벤트를 줄 수 잇음
useEffect의 deps(배열)의 값에 어떠한 값을 넣게 되면 해당 값이 바뀔 때 마다 등록한 함수가 호출 됨
만약 useState나 파라미터 변경시 deps에 그 값을 넣어주어야 함
-> 최신의 값을 가르켜줌

- deps를 써주지 않으면 브라우저 상에는 표시가 되지 않지만 virtual dom 에서의 모든 작업들이 렌더링이 됨
  -> 항목들이 많아질 경우 문제가 될 수 있음

1. mount, unmount 시 에만 변경

```jsx
useEffect(() => {
  console.log('컴포넌트가 화면에 나타남');
  return () => {
    console.log('컴포넌트가 화면에서 사라짐');
  };
}, []);
```

2. update 시에 변경

```jsx
useEffect(() => {
  console.log(user);
}, [user]);
```

1. mount

- props -> state
- 외부 API 요청
  REST API
- 라이브러리 사용
  D3 Video.js
- setInterval, setTimeout

2. unmount(cleaner 함수)

- clearInterval, clearTimeout
- 라이브러리 인스턴스 제거
