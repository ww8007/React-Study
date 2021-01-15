# 리덕스

# 목차

- [개념]-(#개념)
- [사용되는키워드숙지]-(#사용되는-키워드-숙지)
- [리덕스 3가지 규칙](#리덕스-3가지-규칙)
- [사용 준비](#사용-준비)
- [액션 함수 생성](#액션-함수-생성)
- [리덕스 모듈 만들기](#리덕스-모듈-만들기)
- [카운터 구현](#카운터-구현)
- [리덕스 개발자 도구 적용하기](#리덕스-개발자-도구-적용하기)

# 개념

상태 관리 라이브러리
상태 관리 로직을 좀 더 쉽게 가능
Context API + useReducer 와 거의 비슷
이전의 Context API은 좀 불편했음
Redux -> javascript, angular

- 많이 사용한다고 해서 가장 좋은 것은 아님
  글로벌 상태가 별로 없다면 의미가 크지 않음

- 차이점
  1. 미들웨어
     - 특정 조건에 따라 액션이 무시되게 만들 수 있음
     - 액션을 콘솔에 출력하거나 서버쪽에 로깅 가능
     - 액션이 디스패치 -> 수정하여 리듀서에게 전달 가능
     - 특정 액션 발생 -> 이를 기반 다른 액션 발생가능
     - 특정 액션 발생 -> 특정 자바스크립트 함수 실행 가능
       비동기 작업을 체계적으로 가능
  2. 유용한 함수와, Hooks
     - Context의 경우 Component, Hook 사용자 생성
     - connect, useSelector, useDispatch, useStore
     -
  3. 기본적인 최적화가 이미 되어있음
  4. 하나의 커다란 상태
     - 매번 context를 만들어야 하는 수고 x
  5. DevTools
     유용한 프로그램 사용가능
  6. 이미 사용중인 프로젝트가 많다
- 사용처
  1. 프로젝트 규모
  1. 비동기 작업
  1. 리덕스가 편하게 느껴지나

### 사용되는 키워드 숙지

1.  액션 (Action)
    ```jsx
    {
    type: "ADD_TODO",
    data: {
     id: 0,
     text: "리덕스 배우기"
    }
    }
    ```
        업데이트를 해야할 때 어떻게 업데이트 할지 정의 객체
2.  액션 생성 함수(Action Creator)
    액션을 만드는 함수
    파라미터를 받아와서 액션 객체로 생성
    - 리덕스 사용할 때 액션 생성 함수 사용하는 것이 필수 x 액션을 발생 시킬 때마다 직접 액션 객체 작성 가능
3.  리듀서(Reducer)
    useReducer와 비슷 : state, action 받아옴
    **불변성** 유지를 해줘야 함, 반환을 시켜줌
    - useReducer 차이점
      useReducer는 error 반환을 했지만 Reducer는 **현재상태(state)** 반환을 해줌
      여러개 reducer 생성 -> root, sub
    ```jsx
    function counter(state, action) {
      switch (action.type) {
        case 'INCREASE':
          return state + 1;
        case 'DECREASE':
          return state - 1;
        default:
          return state;
      }
    }
    ```
4.  스토어(Store)
    현재 App의 상태와 Reducer, 내장함수
    - 내장함수
      1. 디스패치(dispatch)
         액션을 발생, 액션을 스토어에게 전달
         ```jsx
         dispatch({ type: 'INCREASE' });
         ```
      2. 구독(subscribe)
         action이 dispatch 될 때 마다 특정 함수 호출 가능
         -> store 상태 update -> 특정함수 호출

### 리덕스 3가지 규칙

1. 하나의 애플리케이션엔 하나의 스토어가 있음
   여러개 생성 가능, 하지만 권장 x
2. 상태는 읽기 전용
   **불변성**을 지켜줌 <- 좋은 성능 유지를 위함
   객체(spread), 배열(map, concat, filter, slice)
3. 변화를 일으키는 함수 리듀서는 순수한 함수 이여야 함
   1. 리듀서 함수는 이전 상태, 액션 객체를 파라미터로 받음
   2. 이전의 상태는 **절대로** 변경하지 않고 변화를 일으킨 새로운 상태로 만들어 반환
   3. **똑같은 파라미터**로 호출된 리듀서 함수는 **언제나 똑같은 결과값**을 반환애야 함
      똑같은 input -> 똑같은 ouput
      new Date(), Math.random(), axios.get 사용 불가
      reducer 밖 변수 사용 **불가** 상수 사용가능
      비동기 작업을 해야할 경우는 -> Component, 미들웨어

### 사용 준비

yarn add redux

### 액션 함수 생성

- 액션 타입 : 대문자
- 액션 함수 : 소문자
- \_(언더바) : camelcase

1.  액션 타입 정의
    ```jsx
    const INCREASE = 'INCREASE';
    ```
2.  액션 함수 정의 \* 액션 함수는 function 키워드 사용가능 하지만 보통의 경우 **화살표 함수**로 작성
    return 생략 가능
    ```jsx
    const increase = () => {
      return {
        type: INCREASE,
      };
    };
    ```
3.  reducer 설정
    - state 초기 값을 설정을 시켜주어야 제대로 동작
    ```jsx
    function reducer(state = initialState, action) {
      switch (action.type) {
        case INCREASE:
          return {
            ...state,
            counter: state.counter + 1,
          };
        default:
          return state;
      }
    }
    ```
4.  store 만들어주기
    ```jsx
    const store = createStore(reducer);
    ```
5.  listener 생성
    ```jsx
    const listener = () => {
      const state = store.getState();
      console.log(state);
    };
    ```
6.  subscribe 구독 생성
    ```jsx
    const unsubscribe = store.subscribe(listener);
    ```
    - 구독 해제 하고 싶을 시 unsubscribe 호출
7.  dispatch 해주기
    ```jsx
    store.dispatch(increase());
    ```

- console 창에 띄우주기 -> window.store = store;

### 리덕스 모듈 만들기

액션 타입, 액션 생성 함수, reducer

- Ducks 패턴
  한 파일에 몰아서 생성
  reducer -> export default
  편함, 배우는 과정에서 좋음

DUCKS 패턴 특정

- 액션타입
  액션 타입 앞에 문자열 앞 접두사 -> 다른 모듈과 이름 차별화
- 액션 생성 함수
  앞에 **export** 선언

- CombineReducers 호출

  1.  make -> root reducer
      ```jsx
      import { CombineReducers } from 'redux';
      ```
  2.  combine
      ```jsx
      const rootReducer = combineReducers({
        counter,
        todos,
      });
      ```
  3.  yarn add react-redux
  4.  index.js
      ```jsx
      import { Provider } from 'react-redux';
      import { createStore } from 'redux';
      import rootReducer from './modules';
      ```
      - modules 디렉토리만 불러와서 root reducer를 export 시켜줬기에 사용 할 수 있다.
      ```jsx
      const store = createStore(rootReducer);
      ```
  5.  Provider로 감싸기
      ```jsx
      <Provider store={store}>
        <App />
      </Provider>
      ```

### 카운터 구현

- 프리젠테이셔널 컴포넌트
  리덕스 스토어에 직접적으로 접근하지 않고 필요한 값 또는 함수를 props로만 받아와서 사용하는 컴포넌트
- input의 value는 문자열 -> 숫자로 변환

  ```jsx
  onSetDiff(parseInt(e.target.value, 10));
  ```

  UI 중점적 -> 프리젠테이셔널 컴포넌트

- containers
  리덕스 상태 조회, action -> dispatch 컴포넌트

  1. useSelector 선언
     ```jsx
     import { useSelector } from 'react-redux';
     ```
  2. 객체로 선언
     ```jsx
     const { number, diff } = useSelector((state) => ({
       number: state.counter.number,
       diff: state.counter.diff,
     }));
     ```
  3. 불러와서 사용
     ```jsx
     <Counter
       number={number}
       diff={diff}
       onIncrease={onIncrease}
       onDecrease={onDecrease}
       onSetDiff={onSetDiff}
     ></Counter>
     ```

* useSelector

  ```jsx
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));
  ```

  객체에서 number,diff 값 객체로 빼와서 사용

* useDistpatch
  dispatch 함수 만들어서 바로 사용 가능

  ```jsx
  const dispatch = useDispatch();
  ```

* dispatch

  ```jsx
  const onIncrease = () => dispatch(increase());
  ```

  액션 생성 함수 호출이 되면 객체 생성 후 dispatch

* 정리 개념
  presentation component : UI (Props 전달 받아 변경)
  container component : 상태

  redux stores : action dispatch

  꼭 구분 지어서 컴포넌트를 분리 할 필요 없다.
  -> 지금의 프로젝트들은 이것을 정석으로 둠

### 리덕스 개발자 도구 적용하기

현재 까지 어떤 action dispatch -> 상태 바뀌었는지
바로 dispatch도 적용 가능

yarn add redux-devtools-extension

1. index.js
   ```jsx
   import { composeWithDevTools } from 'redux-devtools-extension';
   const store = createStore(rootReducer, composeWithDevTools());
   ```
2. 크롬에서 사용

### 할 일 목록 구현하기

1. TodoItem
   할 일 하나 보여주기

   - style
     ```jsx
         <li style={{
         textDecoration: todo.done ? 'line-through' : 'none'
     }}
     ```
   - click
     ```jsx
     onClick={()=> onToggle(todo.id)}
     ```
     todo id를 통해 onToggle 호출

   * nav
     todo text 호출

2. TodoList
   여러개의 할 일 항목
   - map 함수 이용
     ```jsx
     {
       todos.map((todo) => (
         <TodoItem key={todo.id} todo={todo} onToggle={onToggle}></TodoItem>
       ));
     }
     ```
3. Todos
   새 항목 등록 폼
   - onSubmit
     이벤트 객체 선언 후 **preventDefault()**
     -> 새로 고침을 안하게 해줌

- 리덕스를 사용한다고 해서 모든 상태를 redux에서 사용하지 않음
  컴포넌트 내부에서 local로 useState hook을 사용해 관리 가능

4. TodosContainer
   props 필요 x
   ctrl+space 바로 불러오기 가능
   - useSelector -> 상태 조회
     ```jsx
     const todos = useSelector((state) => state.todos);
     ```
   - useDispatch -> dispatch 사용
     ```jsx
     const dispatch = useDispatch();
     ```
   * dispatch 해주기 -> 객체 생성
     ```jsx
     const onCreate = (text) => dispatch(addTodo(text));
     const onToggle = (id) => dispatch(toggleTodo(id));
     ```
   * useCallback으로 최적화
