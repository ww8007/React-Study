# 리덕스 미들웨어

# 목차

- [개념](#개념)
- [리덕스 프로젝트 생성](#리덕스-프로젝스-생성)

### 개념

리덕스를 사용하는데 리덕스 미들웨어 사용x -> Context API

- 사용처
  액션 dispatch -> 조건에 따라 **무시** 가능
  미들웨어 사용 액션이 리듀서 전달 전에 특정 행동 가능
  console, 수정
  액션 dispatch -> 새로운 dispatch 가능
  액션 기반 **비동기** 작업 가능
  API 요청

사용목록
**redux-thunk**, **redux-saga**, redux-observable, redux-promise-middleware

### 리덕스 프로젝트 생성

npx create-react-app learn-redux-middleware

yarn add redux react-redux

모듈 라이브러리 생성 후 counter.js 생성

1. action type 생성(action 이름이 겹치지 않는다면 경로 설정 안해줘도 됨)
2. export 통한 내보내주기
3. initialState 설정(초기상태)
   초기 상태가 꼭 객체나 배열일 필요는 없다.
   ```jsx
   const initialState = 0;
   ```
4. reducer 작성(action.type에 기반함)
   export default

```jsx
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
```

5. combineReducers를 통한 reducer 생성(root)

```jsx
import { combineReducers } from 'redux';
```

생성후 rootReducer export

```jsx
const rootReducer = combineReducers({ counter });

export default rootReducer;
```

6. index.js에 Provider, createStore, rootReducer **import**

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
```

store 생성

```jsx
const store = createStore(rootReducer);
```

Provider로 App 감싸고 props로 store 전달

```jsx
<Provider store={store}>
  <App />
</Provider>
```

이후 presetational component와 container 생성

7. Counter Presentional (UI) Component 생성

UI 적인 interface 보여주는 부분이라고 생각하면 됨
함수형 컴포넌트 생성 후 props로 number, onIncrease, onDecrease 받아옴

8. Container 컴포넌트 생성

   1. useSelector , useDispatch import
      ```jsx
      import { useSelector, useDispatch } from 'react-redux';
      ```
   2. useSelector 통한 조회 state 안 state.counter
      - useSelector : 리덕스 상태를 조회하는 hook
      ```jsx
      const number = useSelector((state) => state.counter);
      ```
   3. dispatch 선언
      ```jsx
      const dispatch = useDispatch();
      ```
   4. onIncrease, onDecrease 선언 with dispatch
      ```jsx
      const onIncrease = () => {
        dispatch(increase());
      };
      const onDecrase = () => {
        dispatch(decrease());
      };
      ```
   5. return 부에 내용 전달
      ```jsx
      <Counter
        number={number}
        onIncrease={onIncrease}
        onDecrase={onDecrase}
      ></Counter>
      ```
