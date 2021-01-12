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

```cmd
npx create-react-app begin-react
```

### 'MODULE_NOT_FOUND' 오류

1. rm -rf node_modules

2. npm isntall

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

### useMemo Hook

이전에 연산된 값을 다시 사용
-> 성능 최적화에 사용

```jsx
const count = useMemo(() => countActiveUsers(users), [users]);
```

위 와 같이 선언하면 users가 update 될 때에만 호출 되게 됨

### useCallback Hook

1st parameter : 감싸야 할 파라미터
2nd parameter : 바뀌어야 할 내용[deps]

이 전에 만들었던 함수를 재사용 하게 됨
useMemo와 비슷하지만 **함수**에 특화

- 상태나 props를 deps에 선언하지 않는다면 최신화가 이루어지지 않음

함수를 새로 선언하는 것은 메모리, cpu 적으로 부하적 문제는 없음
-> 나중에 컴포넌트들이 리렌더링이 props가 바뀌지 않는다면 재사용 할 수 있게 구현 하기 위함
-> 새로 만들어지는 구조라면 최적화를 하지 못함

```jsx
const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((user) => user.id !== id));
  },
  [users],
);
```

지금의 단계에서는 확실환 최적화는 없음

### React.memo

컴포넌트의 reredering 성능을 개선

```jsx
export default React.memo(CreateUser);
```

위 와 같이 감싸주기만 해도 최적화 첫 단계

두 번째 단계 : useState의 함수형 update 사용

- before

```jsx
const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((user) => user.id !== id));
  },
  [users],
);
```

- after

```jsx
const onRemove = useCallback((id) => {
  setUsers((users) => users.filter((user) => user.id !== id));
}, []);
```

onRemove는 첫 component가 rendering 될 때 빼고는 계속 재사용
useMemo 2nd parameter
아래와 같이 사용할 때는 변경되는 component가 진짜 고정적인 값인지 확인하고 사용해야 함
심각한 오류 발생 가능

```jsx
export default React.memo(
  UserList,
  (prevProps, nextProps) => nextProps.users === prevProps.users,
);
```

### 성능 최적화 주의점

정말로 최적화가 가능한지 확인 하면서 memo, useCallback들을 확인해 봐야함
적용을 하더라도 실행되는 부분이 많아진다면 정확한 최적화가 아닐 수 있음

### useReducer Hook

1st parameter : reducer 함수
2nd parameter : 기본값(숫자, 문자, 객체, 배열)

컴포넌트의 상태 update -> useState

- custom hook 생성 후 useReduce 사용 주의 사항
  함수의 이름 use대문자 또는 Try 이렇게 들어가야지 아니면 오류가 발생
  이유는 아직 모르겠음

useReducer
action 객체를 통한 update
type 을 통해 명시

- 상태 업데이트 로직을 컴포넌트 밖으로 분리 가능

- reducer : 상태를 update 하는 함수
  새로운 상태를 반환하게 됨

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      throw new Error('Unhandled error');
  }
}
```

- 비구조 할당을 통한 추출

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
const { users } = state;
const { username, email } = state.inputs;
```

useReducer, useState

장단점 존재

component에서 관리하는 값이 여러개면 useReducer가 더 좋음
간단 -> useState, 복잡 -> useReduce

### Custom Hook 만들기

component 생성 -> 반복되는 로직이 생김
반복되는 로직을 hook로 생성
use라는 이름으로 만들어서 함수를 명시

```jsx
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;
```

- Object.keys(obj) 키가 담긴 배열을 반환

### Context API를 사용한 전역 값 관리

component의 구조가 복잡해 졌을시 용이함

1. const 변수명 = createContext('기본값'); 선언

```jsx
const Mycontext = createContext('defaultValue');
export const UserDispatch = createContext(null);
```

2. Mycontext.Provider를 통해 value 값 선언

```jsx
function ContextSample() {
  return (
    <Mycontext.Provider value="GOOD">
      <GrandParent></GrandParent>
    </Mycontext.Provider>
  );
}
```

3. Child -> useContext(Mycontext) 사용하여 사용 가능

```jsx
function Child() {
  const text = useContext(Mycontext);
  return <div>안녕하세요? {text}</div>;
}

const dispatch = useContext(UserDispatch);
```

4. 사용 하려는 부분에서 사용

```jsx
onClick={() =>
          dispatch({
            type: 'TOGGLE_USER',
            id,
          })
        }
```

나중에 상태도 넣어서 관리가 가능

### immer 이용한 더 쉽게 불변성 유지

1st par = state
2nd par = draft(함수)

```jsx
const obj = {
  a: 1,
  b: 2,
};
const nextobj = {
  ...obj,
  b: 3,
};
```

위와 같이 spread 연산자를 사용하는 것이 정확한 불변성 유지

배열의 경우 : concat, filter, map

- 상태가 복잡해지면 생각해야 할 것이 많아짐
  어려운 것은 아니지만 코드가 복잡

immer 사용하면 불변성 해쳐도 동작 가능

- 개발자 도구에서 immer 사용법
  ```jsx
  window.produce = produce;
  ```
  사용법
  ```jsx
  const state = {
  number : 1,
  dontChangeMe:2
  };
  const nextStage = produce(state, draft => {
  draft.number+=1;});
  nextStage
  {number: 2, dontChangeMe: 2}
  ```

기존의 상태는 유지하면서 (불변성 유지) 새롭게 생성
immer를 사용한다고 해서 코드가 쉬워지는 것은 아님

- immer에서는 splice 함수 사용하여 내용 삭제 가능함

- immer를 사용하면 함수형 update를 더 깔끔하게 구현 가능

- 첫번째 state 없고 draft만 선언하면 update형 함수로 구현 됨
  useState 이용한 함수형 update를 작성해야 하는데 불변성을 유지해야 할 때 사용

  ```jsx
  const todo = {
    text: 'Hello',
    done: false,
  };
  const updater = producer((draft) => {
    draft.done = !draft.done;
  });
  const nextTodo = updater(todo);

  const [todo, setTodo] = useState({
    text: 'Hello',
    done: false,
  });

  const onClick = useCallback(() => {
    setTodo(
      produce((draft) => {
        draft.done = !draft.done;
      }),
    );
  }, []);
  ```

* immer를 무작정 사용하는 것이 아닌 필요한 곳에만 사용

### class형 컴포넌트

잘 사용하지 않음
알아둘 필요는 있음 -> 유지보수할 일, 함수형, hooks로 못하는 일을 할 수 있음
hooks 가 생기면서 class형 component는 좀 떨어짐

- this를 특정 함수와 연결시켜주면 this의 개념을 잃어버리게 됨
  -> 3가지 방법

  1. constructor(props) 이용방법

  ```jsx
  constructor(props){
    super(props);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }
  ```

  2. custom method 이용 화살표 함수

  ```jsx
  handleIncrease = () => {
    console.log(this);
    console.log('increase');
  };
  ```

  - state는 무조건 객체 형태이여야 함
    -> 다른 형식으로 선언 시 오류 남

  3. state 바로 설정

  ```jsx
  state = {
    counter: 0,
  };
  ```

  spread나 따로 설정을 안해줘도 상태는 유지가 됨

  - 상태에 들어있는 값이 객체이면 불변성 유지를 시켜줘야 함

  CRA로 만든 프로젝트에서 많이 사용
  cra: react

setState 함수는 비동기적으로 update가 일어남

```jsx
this.setState((state) => ({
  counter: state.counter + 1,
}));
```

위와 같이 함수형 update를 사용해야 함

### LifeCycle 메서드

생명주기 메서드
컴포넌트가 나타나고 update 사라질 때, 에러 호출 되는 메서드
class 형 method에서만 나타남
useEffect와 비슷

- 메뉴얼을 보고 이해하고 사용할 줄 아는 정도로만 알아두면 됨

메소드 호출
![image](https://user-images.githubusercontent.com/54137044/104164779-ca5f9f00-543b-11eb-934d-4289d27742e4.png)

1. 마운트

- constructor
  컴포넌트의 생성자 메서드
  가장 먼저 실행
- getDerivedStateFromProps
  props로 받아온 것을 state에 넣어주고 싶을 때 사용
  **static**이 필요 이 안에서는 **this** 조회 불가
  특정 객체 반환 시 객체 안에 있는 모든 내용들이 **state**로 설정
  처음 랜더링 되기 전에도 호출, 리렌더링 되기 전에도 매번 실행
- render
  컴포넌트를 랜더링 하는 메서드
- componentDidMount
  첫번째 렌더링이 마치고 나면 호출
  사용자에게는 화면에 호출이 마친 상태
  외부 라이브러리 연동을 하거나
  컴포넌트에서 필요로 하는 데이터 요청 axios, fetch등을 통해 ajax요청
  DOM의 속성을 읽거나 직접 변경하는 작업 진행

2. 업데이트

- getDerivedStateFromProps
  props나 state가 바뀌었을 때도 메서드 호출
- shouldComponentUpdate
  리렌더링 할지 말지 결정
  **최적화** 할때 사용하는 메서드
  React.memo와 역할 비슷
- render
  컴포넌트를 랜더링 하는 메서드
- getSnapshotBeforeUpdate
  컴포넌트에 변화가 일어나기 직전의 DOM 상태를 가져와서 특정 값을 가져와
  특정 값을 반환 시 다음 발생하는 **componentDidUpdate** 함수에서 받아와서 사용가능
- componentDidUpdate
  리렌더링이 마치고 화면에 우리가 원하는 변화가 모두 반영되고 난 뒤 호출되는 메서드
  3번째 파리미터로 getSnapshotBeforeUpdate 에서 반환한 값을 조회 가능

3. 언마운트

컴포넌트가 화면에서 사라짐 의미

- componentWillUnmount
  화면에서 사라지기 전 호출
  DOM에 직접 등록했었던 이벤트 제거
  setTimeout 같은 것 존재한다면 clearTimeout 을 통해서 제거
  외부 라이브러리를 사용한게 있고 라이브러리에 dispose 기능 존재하면 여기서 호출

### componentDidCatch 메서드

1st par : error
2nd par : info

함수형 컴포넌트에서는 구현 불가

에러는 개발환경에서만 표현 됨
사용자에게 흰화면만 띄워주게 됨

우리의 실수로 인해서 흰화면이 아닌 에러가 발생한 상황을 알려줌

```jsx
if (!user) return null;
```

위와 같이 예외 처리를 할 수 있음

```jsx
componentDidCatch(error, info) {
    console.log('에러 발생');
    console.log({
      error,
      info,
    });
    this.setState({
      error: true,
    });
  }
```

### Sentry를 통한 에러를 실시간 탐지

production 에서 componentDidCatch 사용시 에러 잡아내지 못함
그렇게 되면 이렇게 선언

```jsx
if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error, { extra: info });
}
```

#### 서버 배포

yarn build

npx serve ./build

서버를 로컬 호스트에서 열게 되면 map 파일 존재해서 minified 되서 참조 가능한데 로컬에서는 접근 못함

map을 sentry에 업로드도 가능

### Prettier 설정

1. "trailingComma"
   객체와 배열 선언 ,를 넣어주는 것
2. "tabWidth"
   들여쓰기 , 기본 값 : 4
3. "semi"
   세미콜론
4. "singleQuote"
   쌍 따옴표, 곁 따옴표

### ESLint

[link](npm install --save-dev eslint-config-react-app @typescript-eslint/eslint-plugin@^4.0.0 @typescript-eslint/parser@^4.0.0 babel-eslint@^10.0.0 eslint@^7.5.0 eslint-plugin-flowtype@^5.2.0 eslint-plugin-import@^2.22.0 eslint-plugin-jsx-a11y@^6.3.1 eslint-plugin-react@^7.20.3 eslint-plugin-react-hooks@^4.0.8)

eslint 제외

/_ eslint-disable _/
추가(주석)

### Snippet(코드 조각)

기본적으로 내장
단축어로 코드 생성

직접 만들어서서 쓰는 걸 권장

[Snippet](https://snippet-generator.app)

파일 -> 기본설정 -> 사용자 코드 조각
