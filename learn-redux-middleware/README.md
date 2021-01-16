# 리덕스 미들웨어

# 목차

- [개념](#개념)
- [리덕스 프로젝트 생성](#리덕스-프로젝스-생성)
- [리덕스 미들웨어 직접 작성해보기](#리덕스-미들웨어-직접-작성해보기)
- [redux-logger 사용 및 미들웨어와 DevTools 함께 사용](#redux-logger-사용-및-미들웨어와-devtools-함께-사용)

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

### 리덕스 미들웨어 직접 작성해보기

template 기본 구성

```jsx
const middleware = (stroe) => (next) => (action) => {
  // 하고 싶은 작업
};
```

- 함수형 전환

```jsx
function middleware(store) {
  return function (next) {
    return function (action) {
      //하고 싶은 작업
    };
  };
}
```

action -> middleware 사용할 때 전달하는 함수

- next를 호출 하지 않는다면 action이 리듀서로 전달되지 않고 무시됨

- 직접 middleware 작성
  1. myLogger 선언
     ```jsx
     const myLogger = (store) => (next) => (action) => {};
     ```
     한꺼번에 가져오는 것이 아님
  2. action을 다음 middle ware(없다면 result) or reducer 전달
     ```jsx
     const result = next(action);
     ```
  3. return result
     container에서 dispatch 됬을 때 결과물을 바로 반환
  4. index.js
     applyMiddleWare 선언
     ```jsx
     import { createStore, applyMiddleware } from 'redux';
     ```
     - 선언한 myLogger -> applyMiddleware에 적용
       ```jsx
       const store = createStore(rootReducer, applyMiddleware(myLogger));
       ```
  5. action이 reduer에서 처리 되고 난 다음에 다음 상태를 가져와 콘솔에 출력
     ```jsx
     console.log('\t', store.getState());
     ```
  - 전과 후를 모두 보고 싶을 경우
    ```jsx
    const myLogger = (store) => (next) => (action) => {
      console.log(action);
      console.log('\tPrev', store.getState());
      const result = next(action);
      console.log('\tNext', store.getState());
      return result;
    };
    ```
    - action이 객체가 아닌 함수를 받아오게 만들 수 있음 -> thunk
      ```jsx
      const thunk = (store) => (next) => (action) =>
        typeof action === 'function'
          ? action(store.dispatch, store.getState)
          : next(action);
      ```

### redux-logger 사용 및 미들웨어와 DevTools 함께 사용

yarn add redux-logger

1. index.js
   logger import

   ```jsx
   import logger from 'redux-logger';
   ```

2. yarn add redux-devtools-extension
3. index.js -> import composeWithDevTools
   ```jsx
   import { composeWithDevTools } from 'redux-devtools-extension';
   ```
4. composeWithDevTools로 applyMiddleware 감싸주기
   ```jsx
   const store = createStore(
     rootReducer,
     composeWithDevTools(applyMiddleware(logger)),
   );
   ```

### redux-thunk

많이 사용되는 라이브러리
액션 객체가 아닌 **함수**를 디스패치 가능, 현재 상태 조회가능, 액션 디스패치 가능

1. yarn add redux-thunk

2. import ReduxThunk
   ```jsx
   import ReduxThunk from 'redux-thunk';
   ```

- ReduxThunk와 logger를 함께 사용시 주의점
  logger가 맨 뒤로 가야함 -> 이렇게 안할시 logger가 함수도 action으로 간주

3. ReduxThunk 사용

   ```jsx
   const store = createStore(
     rootReducer,
     composeWithDevTools(applyMiddleware(ReduxThunk, logger)),
   );
   ```

4. thunk 함수 작성
   - thunk 함수에서 getState 사용할 필요 없다면 생략해도 무관
   - thunk 함수는 dispatch를 받아오는 부분 부터 시작 아래 코드 1 명시
   - thunk 함수를 만들어주는 부분 = 2 -> thunk creator
   ```jsx
   export const increaseAsync = 2. () => 1. (dispatch) => {
     setTimeout(() => {
       dispatch(increase());
     }, 1000);
   };
   ```
   - CounterContainer dispatch 내용 수정
   ```jsx
   const onIncrease = () => {
     dispatch(increaseAsync());
   };
   ```
