# 리덕스 미들웨어

# 목차

- [개념](#개념)
- [리덕스 프로젝트 생성](#리덕스-프로젝트-생성)
- [리덕스 미들웨어 직접 작성해보기](#리덕스-미들웨어-직접-작성해보기)
- [redux-logger 사용 및 미들웨어와 DevTools 함께 사용](#redux-logger-사용-및-미들웨어와-devtools-함께-사용)
- [redux-thunk](#redux-thunk)
- [redux-thunk로 Promise 다루기](#redux-thunk로-promise-다루기)
- [라우터 연동 특정 포스트 읽기](#라우터-연동-특정-포스트-읽기)
- [포스트 리스트 데이터 유지 및 포스트 데이터 초기화](#포스트-리스트-데이터-유지-및-포스트-데이터-초기화)
- [포스트 데이터 리덕스 상태 구조 바꾸기](#포스트-데이터-리덕스-상태-구조-바꾸기)
- [Thunk 함수 Util 함수](#thunk-함수-util-함수)
- [Thunk 에서 리액트 라우터 History 사용하기](#thunk-에서-리액트-라우터-history-사용하기)
- [JSON Server](#json-server)
- [redux-saga](#redux-saga)

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

### redux-thunk로 Promise 다루기

1.  api 생성(진짜 아님)
    - sleep : n msec
    ```jsx
    const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
    ```
2.  posts 배열 생성 (객체)
3.  export 내용 작성

    ```jsx
    export const getPosts = async () => {
      await sleep(500);
      return posts;
    };

    export const getPostById = async (id) => {
      await sleep(500);
      return posts.find((post) => post.id === id);
    };
    ```

4.  modules posts.js 생성
    api 요청시 요청이 진행중인 상태 성공시 데이터 상태, 실패 시 에러 상태 관리

    1.  api posts에 만든 가짜 api 불러오기
        ```jsx
        import * as postsAPI from '../api/posts';
        ```
    2.  api 마다 액션 3개씩 생성
        - 특정 요청이 시작 알림
          ```jsx
          const GET_POST = 'GET_POST';
          ```
        - 특정 요청 성공(dispatch 로딩 끝)
          ```jsx
          const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
          ```
        * 요청 에러
          ```jsx
          const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
          ```
    3.  액션 생성함수 생성 또는 thunk에서 액션 바로 dispatch 가능

        ```jsx
        export const getPosts = () => async (dispatch) => {
          //요청 시작 알림
          dispatch({ type: GET_POSTS });
          //API 호출
          try {
            const posts = await postsAPI.getPosts();
            //성공
            dispatch({ type: GET_POSTS_SUCCESS, posts });
          } catch (e) {
            //실패
            dispatch({ type: GET_POSTS_ERROR, error: e });
          }
        };
        ```

        - post 부분에는 id 값을 받아와서 적용

        ```jsx
        export const getPost = (id) => async (dispatch) => {
          //요청 시작 알림
          dispatch({ type: GET_POST });
          //API 호출
          try {
            const posts = await postsAPI.getPost(id);
            //성공
            dispatch({ type: GET_POST_SUCCESS, posts });
          } catch (e) {
            //실패
            dispatch({ type: GET_POST_ERROR, error: e });
          }
        };
        ```

    4.  처리해줄 reducer 작성

        - 반복되는 함수 처리
          lib에 asyncUtils 생성

          - 모든 내용을 함수로 처리 장점
            데이터의 기본값을 파라미터로 받아올 수 있음

          ```jsx
          export const reducerUtils = {
            initial: (data = null) => ({
              data,
              loading: false,
              error: null,
            }),
          };
          ```

          - loading 부분 prevState optional
            로딩 함수 사용시 기존상태 가져오고 loading 값만 수정가능
            **asyncUtils** 부분
            ```jsx
            loading: (prevState = null) => ({
              data: prevState,
              loading: true,
              error: null,
            });
            ```
            **posts** 부분
            ```jsx
            case GET_POSTS:
            return {
            ...state,
            posts: reducerUtils.loading(state.posts.data)
            };
            ```

          * thunk 부분 재사용 가능 createThunk 작성

            - par 1 : type
              요청들에 대하여 타입별로 받아옴
            - par 2 : promiseCreator
              promise 만들어주는 함수

            1.  배열 비구조 할당을 통한 SUCCESS, ERROR 분리
                ```jsx
                const [SUCCESS, ERROR] = ['${type}_SUCCESS', '${type}_ERROR'];
                ```
            2.  파라미터 받아옴

                - 여러개가 필요한 경우 객체로 받아오도록 함
                - payload : 결과를 가져와서 action dispatch -> type: SUCCESS
                  key 값도 따로 설정 필요 x payload로 통일

                * Flux Standard Action
                  모든 액션의 값을 **payload**로 통일
                  에러 발생의 경우는 모두 **true**
                  meta 있을 수 있고 없을 수 있고

                ```jsx
                export const createPromiseThunk = (type, promiseCreator) => {
                  const [SUCCESS, ERROR] = ['${type}_SUCCESS', '${type}_ERROR'];

                  return (param) => async (dispatch) => {
                    dispatch({ type });
                    try {
                      const payload = await promiseCreator(param);
                      dispatch({
                        type: SUCCESS,
                        payload,
                      });
                    } catch (e) {
                      dispatch({
                        type: ERROR,
                        payload: e,
                        error: true,
                      });
                    }
                  };
                };
                ```

          * switch case 부분 최적화
            - type 부분 post, posts
              배열 [key ] 사용해서 분류
              ```jsx
              case type:
              return{
                  ...state,
                  [key]: reducerUtils.loading(),
              }
              ```
              - handleAsyncActions 만든 것 사용
                ```jsx
                const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts');
                ```
                ```jsx
                export default function posts(state = initialState, action) {
                  switch (action.type) {
                    case GET_POSTS:
                    case GET_POSTS_SUCCESS:
                    case GET_POSTS_ERROR:
                      return getPostsReducer(state, action);
                    case GET_POST:
                    case GET_POST_SUCCESS:
                    case GET_POST_ERROR:
                      return getPostReducer(state, action);
                    default:
                      return state;
                  }
                }
                ```

    5.  PostList 작성
        - key 값과 title 값을 이용한 li list 작성
        ```jsx
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        ```
    6.  PostListContainer 작성

        1. useSelector 이용 data, loading, error 불러오기
           ```jsx
           const { data, loading, error } = useSelector(
             (state) => state.posts.posts,
           );
           ```
        2. hook 사용해서 dispatch 불러오기

           - hook 사용해서 dispatch 불러왔기 때문에 useEffect의 deps로 dispatch 선언 해줘야 함 -> eslint 법칙 기준 없어도 무관

           ```jsx
           const dispatch = useDispatch();

           useEffect(() => {
             dispatch(getPosts());
           }, [dispatch]);
           ```

### 라우터 연동, 특정 포스트 읽기

yarn add react-router-dom

react router dom 불러오기

```jsx
import { BrowserRouter } from 'react-router-dom';
```

Provider 감싸기

- Post : Presentational Component

* PostContainer 작성
  useSelector와 useDispatch 이용

  - useSelector -> 상태 최신화 (data, loading, error)
    ```jsx
    const { data, loading, error } = useSelector((state) => state.posts.post);
    ```
  - dispatch
    ```jsx
    const dispatch = useDispatch();
    ```
  - useEffect
    ```jsx
    useEffect(() => {
      dispatch(getPost(post));
    }, [postId, dispatch]);
    ```

* PostPage 작성
  props -> match

  - url par(문자열) 이므로 기존 id 값(정수)와 비교불가
    자바스크립트 내장함수 **parseInt** 사용
    ```jsx
    const postId = parseInt(id, 10);
    ```

  * PostContainer 불러온 뒤 props로 postId 전달
    ```jsx
    return <PostContainer postId={postId}></PostContainer>;
    ```

* App.js에 router 작성

* Link 사용
  post 항목 클릭 시 다른 주소로 이동

import reportWebVitals from './reportWebVitals';

### 포스트 리스트 데이터 유지 및 포스트 데이터 초기화

전의 코드는 같은 데이터를 다시 불러오고 불필요한 재로딩이 있음

- 재로딩

  1. 기존 데이터 존재하면 리로딩 x 하도록
     useEffect 에서 데이터 x -> 행동 x
     ```jsx
     useEffect(() => {
       if (data) return;
       dispatch(getPosts());
     }, [dispatch, data]);
     ```
  2. 현재상태에서는 loading 되면 초기화가 되도록 코드가 짜여있음

     ```jsx
     loading: (prevState = null) => ({
     data: prevState,
     loading: true,
     error: null,
     }),
     ```

     -> handleAsncActions에 par 하나 더 받아서 state[key ].data값이 존재하면 넣어주고 아니면 null 값 불러오게 설정

     ```jsx
     export const handleAsyncActions = (type, key, keepData) => {
     const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
     return (state, action) => {
     switch (action.type) {
       case type:
         return {
           ...state,
       [key]: reducerUtils.loading(keepData ? state[key].data : null),
         };

     ```

  - 다음으로 PostListContainer 부분 deps data 삭제

* post 에서 다른 post로 갈 시 이전의 데이터가 잠깐 보이는 것을 방지
  - poss 에 액션 함수 CLEAR_POST 작성
    ```jsx
    const CLEAR_POST = 'CLEAR_POST';
    ```
  * 액션 생성 함수 작성
    ```jsx
    export const clearPost = () => ({ type: CLEAR_POST });
    ```
  * reducer case 구문 추가
    ```jsx
      case CLEAR_POST:
        return {
            ...state,
            post: reducerUtils.initial(),
          };
    ```
  * clean up 함수
    컴포넌트 unmount, postID 바뀌어서 effect 함수 호출 직전 호출
    ```jsx
    useEffect(() => {
      dispatch(getPost(postId));
      return () => {
        dispatch(clearPost());
      };
    }, [postId, dispatch]);
    ```
  * 지금 단계에서는 캐싱 불가(이전의 데이터 사용)

### 포스트 데이터 리덕스 상태 구조 바꾸기

이전의 구조는 데이터에 재사용이 힘들어짐

- getPost 수정
  - meta:id
    리듀서에서 id를 참고해 update
    ```jsx
    export const getPost = (id) => async (dispatch) => {
      dispatch({ type: GET_POST, meta: id });
      try {
        const payload = postsAPI.getPostById(id);
        dispatch({ type: GET_POSTS_SUCCESS, payload, meta: id });
      } catch (e) {
        dispatch({
          type: GET_POSTS_ERROR,
          payload: e,
          error: true,
          meta: id,
        });
      }
    };
    ```
  * initialState -> 비어있는 객체

* reducer 설정
  지금의 설정은 데이터를 재사용 하기 위해서 설정하는 것 이므로
  위에서 initialState를 비어있는 객체로 선언 -> 오류 발생 가능(loading(state.post[id ].data))
  **&&** 연산자 사용

  ```jsx
  case GET_POST:
  return {
  ...state,
  post: {
  ...state.post,
  [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
  },
  };
  ```

* PostContainer 수정
  - 비구조 할당시 처음에 data가 아무것도 없을 경우 오류 발생
    -> 간단하게는 || 통해 빈객체 삽입 또는
    reducerUtils.inital() 사용
    ```jsx
    const { data, loading, error } = useSelector(
      (state) => state.posts.post[postId] || reducerUtils.initial(),
    );
    ```

### Thunk 함수 Util 함수

- 파라미터가 아이디만이 아닌 객체로 받아올 수 있게 idSelector 선언하여 사용

```jsx
const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (type, promiseCreator, idSelector) => {};
```

1. createPromisThunk 의 부분과 유사하게 작성한 뒤 meta: id 추가 및

```jsx
const id = idSelector(param) 추가
```

2. Reducer 수정

meta 형식의 id를 가지고 있으니 cosnt id = action.meta
특정 id 값을 통해 update
...key
객체가 없을 수 있으니 객체가 존재 할 때만 넣어주도록 && 선언

```jsx
        case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(keepData ? (state[key][id] && state[key][id].data) : null),
          },
        };
```

### Thunk 에서 리액트 라우터 History 사용하기

ex) 로그인 성공 경로

1. index.js import

```jsx
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();
<Router history={customHistory}>
```

- 여러개의 withextraArgument 사용 : 객체로 선언

```jsx
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger,
    ),
  ),
);
```

- Thunk 생성 함수를 이용한 home 구현

dispatch, getState, extra

extra : history -> 비구조 할당을 통한 추출

- PostContainer 부분에서 goToHome() 사용

```jsx
button onClick={()=> dispatch(goToHome())}>홈으로 이동</button>
```

- 지금 상태는 Thunk -> dispatch 하면 Home으로 가게 했지만
  나중의 경우 getState 통해 현재상태 확인 후 조건부 이동
  비동기 작업(API) <- 조건부 페이지 전환 가능

### JSON Server

JSON 파일 하나만 있으면 연습용
-> 실제에서는 FireBase or Back 구현

1. 생성 디렉토리에 data.json 선언
2. 실제 사용하려는 데이터 크롬 개발자 도구 console에 복사
3. JSON.stringify(posts, null, 2)
4. 서버 열어주기
   npx json-server ./data.json --port 4000
   [**서버 이미지**]<br>
   ![image](https://user-images.githubusercontent.com/54137044/104830733-d4aeec80-58c4-11eb-81f7-a67b0abe656d.png)

- json 파일 기반해서 get method 이용

- postman 설치 후 사용
  [**postman**]<br>
  ![image](https://user-images.githubusercontent.com/54137044/104830752-0f188980-58c5-11eb-8b50-5596ee84c10b.png)

* POST method 이용한 올리기
  ![image](https://user-images.githubusercontent.com/54137044/104830825-c44b4180-58c5-11eb-9725-eab6bb4f1d5c.png)

* PUT method 이용한 수정
  ![image](https://user-images.githubusercontent.com/54137044/104830803-949c3980-58c5-11eb-8d65-515d5da7b1da.png)

5. axios 설치
   yarn add axios

6. api 부분 ./api/posts/js 수정

- 주의 사항 template literal 사용 시 ` 사용 주의

```jsx
import axios from 'axios';

export const getPosts = async () => {
  const response = await axios.get('http://localhost:4000/posts');
  return response.data;
};
// const idSelector = param => param.id;
export const getPostById = async (id) => {
  const response = await axios.get(`http://localhost:4000/posts/${id}`);
  return response.data;
};
```

### CORS와 Webpack DevSErver Proxy

axios 이용 API 호출 할 때 포트가 다르면 원래는 사용할 수 없는게 맞음
json sever에서는 이미 설정이 되어있음

- \*을 사용 어디서 오든 사용이 가능
  backend 직접 구성을 하는 경우 개발 서버에서 들어오는 경우도 설정을 해줘야함
- 프록시를 사용하게 되면 개발 서버에서 프록시를 통해 백엔드 전달
- 백엔드 -> 프록시 -> 개발서버

- 프록시 설정

1. package.json
   "proxy": "http://localhost:4000" 추가
2. 서버 다시 열어주기
   npx json-server ./data.json --port 4000

[**network**]<br>
![image](https://user-images.githubusercontent.com/54137044/104831206-05455500-58ca-11eb-9d99-a311833dd524.png)
제대로 3000번 포트에서 동작하는 것을 확인할 수 있다.

### redux-saga

- thunk -> 함수를 dispatch

- saga -> 액션을 모니터링

  1. thunk로 구현하기 까다로운 작업을 해줄 수 있음
  2. 비동기 작업 진행 할 때 기존 요청 취소 가능
  3. 특정 액션 발생 시 액션 dispatch or 자바스크립트 코드 실행 가능
  4. 웹소켓 사용 경우 Channel 기능 사용 더 효율적 코드 사용 가능
  5. 비동기 작업 실패 시 재시도 기능 구현 가능

- **Generator** 문법 사용

함수의 흐름을 특정 구간에 멈춰놨다가 다시 실행 가능
결과값을 여러번 내보낼 수 있음

yield 사용 여러번 리턴 값 사용 가능

```jsx
function* generatorFunction() {
  console.log('안녕하세요?');
  yield 1;
  console.log('제너레이터 함수');
  yield 2;
  console.log('function*');
  yield 3;
  return 4;
}
```

상수 generator로 받아온 뒤
generator.next() 호출 해서 사용

```jsx
function* sumGenerator() {
    console.log('sumGenerator이 시작됐습니다.');
    let a = yield;
    console.log('a값을 받았습니다.');
    let b = yield;
    console.log('b값을 받았습니다.');
    yield a + b;
```

.next(값) 을 통해 대입도 가능

```jsx
funtion* infiniteAddGenerator() {
  let result = 0;
  while(true) {
    result += yield result;
  }
}
```

끝나지 않는 반복문도 사용 가능

- redux-saga는 Generator에 기반한 미들웨어

### redux-saga 설치 및 사용

yarn add redux-saga

1. 기존의 thunk 함수가 dispatch 이용한 export 였다면 saga -> 순수 객체 만드는 함수로 변환
2. saga 작성
   1. redux-saga import
      ```jsx
      import { delay, put } from 'redux-saga/effects';
      ```
   2. saga 함수 사용
      - 특정 작업 명령하기 위해서는 yield 사용
        ```jsx
            yield delay(1000);
        ```
      * put
        dispatch와 비슷한 개념
        increase 호출해서 액션 객체 만들고 액션 dispatch 하도록 명령
        ```jsx
            yield put(increase());
        ```
      * takeEvery
        INCREASE_ASYNC 액션 dispatch 할 때 마다 코드 실행 의미
      * takeLatest
        가장 마지막으로 들어오는 액션을 받음
        - 만약 delay로 기다리는 도중 마지막 들어오는 명령 바뀌면 그 명령으로 최신화
      * takeLeading
        latest와 반대 개념
      * takeEvery, takeLatest saga를 내보내줘서 **root saga** 생성
3. root-saga 생성
   ```jsx
   import { all } from 'redux-saga/effects';
   ```
   - counterSaga 같은 saga 늘어날 수록 배열 안 추가
   ```jsx
   export function* rootSaga() {
     yield all([counterSaga()]);
   }
   ```
4. index.js createSagaMiddleware import
   ```jsx
   import createSagaMiddleware from 'redux-saga';
   const sagaMiddleware = createSagaMiddleware();
   ```
   - store에 추가
     saga 먼저 오든 thunk 먼저 오든 순서 무관
     ```jsx
     const store = createStore(
       rootReducer,
       composeWithDevTools(
         applyMiddleware(
           ReduxThunk.withExtraArgument({ history: customHistory }),
           sagaMiddleware,
           logger,
         ),
       ),
     );
     ```
   * run 실행 시켜주기
     rootSaga 호출은 아니고 선언만 시켜주면 됨(파라미터로 전달)
   ```jsx
   sagaMiddleware.run(rootSaga);
   ```

### redux-saga로 Promise 다루기

redux-saga 에서는 순수 액션 객체를 만들고
action 모니터링 하고 읽어옴

- yield call : 해당 함수 파라미터 사용해서 호출
  promise가 반환값이 존재 시 반환 할 때 까지 기다림

1. ./modules의 posts 부분 getPosts, getPost 수정

- Posts의 경우 바로 객체만 선언하면 되고
- Post의 경우 하나만 불러와야 하기 때문에 분류를 위해 payload와 meta 값 선언 필요

```jsx
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
```

2.  saga 선언 **getPostsSaga**, **getPostSaga**

    - getPostsSaga의 경우 받아올 값 없기에 함수 인자에 아무것도 필요 x
    - 특정 함수를 호출하는 명령을 내리기에 import call
      yield call 사용하여 postsAPI 부분의 getPosts 함수 호출

    ```jsx
    import { call, put } from 'redux-saga/effects';
    ```

    1.  getPost**s**Saga

        1. call을 통해 const posts 선언 부에 API로 호출한 목록들을 받아올 때 까지 기다렸다가 적용 시킴

        ```jsx
            try {
            const posts = yield call(postsAPI.getPosts);
            }

        ```

        2. put을 통해 액션을 dispatch

        - try
          ```jsx
              yield put({
                type: GET_POSTS_SUCCESS,
                payload: posts,
              })
          ```

        * catch
          ```jsx
              catch(e) {
            yield put({
              type: GET_POSTS_ERROR,
              payload: e,
              error : true,
            })
          }
          ```

    2.  getPostSaga
        > getPostSaga의 경우 API 호출에서도 id 값을 par로 사용하고
        > 액션 생성함수에서도 payload와 meta 값으로 id를 사용하기에
        > action 정보를 받아와야함
        - 이렇게 action만 선언해줘도 해결
          ```jsx
          function* getPostSaga(action) {}
          ```
        - action id 값을 payload로 사용
          ```jsx
          const id = action.payload;
          ```
        - call 의 두번째 par로 id 받아옴
          -> payload의 값에 id 정보가 담기게 됨
          ```jsx
              const post = yield call(postsAPI.getPostById, id);
          ```
        * try, catch는 getPostsSaga와 동일하나 meta : id 만 따로 선언
    3.  Redux module을 위한 Saga 모니터링
        takeEvery를 통해 액션타입 postSaga, postsSaga라면 Saga 호출

            ```jsx
            export function* postsSaga() {
            //모니터링 작업
            yield takeEvery(GET_POSTS, getPostsSaga);
            yield takeEvery(GET_POST, getPostSaga);
            }
            ```

    4.  modules/index.js에 postsSaga 추가
        ```jsx
        export function* rootSaga() {
          yield all([counterSaga(), postsSaga()]);
        }
        ```
