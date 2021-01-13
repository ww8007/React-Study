# API

### API 연동하기

1. yarn add axios

### REST API

1. Uniform
   REST : 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일
2. Stateless(무상태성)
   작업을 위한 상태정보를 따로 저장하고 관리하지 않음
   세션 정보나 쿠키정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 요청만 단순히 처리
   자유도 up 구현 단순
3. Cacheable(캐시가능)
   **HTTP** 기본 웹표준 사용 웹에서 사용하는 기본 인프라 그대로 활용 가능
   HTTP가 가진 캐싱 가능 적용 가능(Last-MOdified 태그 or E-Tag)
4. Self-descriptiveness(자체 표현 구조)
   REST API 메세지만 보고도 이를 쉽게 이해가능
5. Client-Sever 구조
   사용자 인증이나 컨텍스트(세션, 로그인)을 직접 관리 구조 역할 분리
6. 계층형 구조
   다중 계층으로 구성 보안, 로드 밸런싱, 암호화 계층 추가 구조상의 유연성 PROXY, 게이트웨이 같은 네트워크 기반의 중간매체 사용 가능

---

- 디자인 가이드

  1. URI는 정보 자원을 표현해야 함

     1. URI는 정보의 자원을 표현해야 한다. (리소스명은 동사보다는 명사를 사용)
        DELETE /memebers/1

  2. 자원에 대한 행위는 HTTP(GET,POST, PUT, DELETE)로 표현
     |METHOD |역할|
     |---|---|
     |POST |POST를 통해 해당 URI를 요청하면 리소스를 생성합니다.|
     |GET |GET를 통해 해당 리소스를 조회합니다. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다.|
     |PUT |PUT를 통해 해당 리소스를 수정합니다.|
     |DELETE |DELETE를 통해 리소스를 삭제합니다.|

---

- URI 설계 시 주의 점

  1. 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용
  2. URI 마지막 문자로 슬래시 포함 x
  3. 하이픈(-)은 가독성을 높이는데 사용
  4. 밑줄(\_)은 사용하지 X
  5. URI 경로에는 소문자가 적합
     대소문자에 따라 다른 리소스로 인식 가능
     example
     GET : /users/{userid}/likes/devices (관계명이 애매하거나 구체적 표현이 필요할 때)

- 자원을 표현하는 Collection과 Document
  Document -> 문서, 한 개체로 이해
  Collection -> 문서들의 집합, 객체의 집합으로 이해
  Collection -> **복수**

---

- HTTP 응답 상태 코드
  잘 설계된 REST API는 URI만 잘 설계된 것이 아닌 그 리소스에 대한 응답을 잘 내어주는 것 까지 포함

| 상태코드 |                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------- |
| 200      | 클라이언트의 요청을 정상적으로 수행함                                                                    |
| 201      | 클라이언트가 어떠한 리소스 생성을 요청, 해당 리소스가 성공적으로 생성됨(POST를 통한 리소스 생성 작업 시) |

| 상태코드 |                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------- |
| 400      | 클라이언트의 요청이 부적절 할 경우 사용하는 응답 코드                                             |
| 401      | 클라이언트가 인증되지 않은 상태에서 보호된 리소스를 요청했을 때 사용하는 응답 코드                |
|          | (로그인 하지 않은 유저가 로그인 했을 때, 요청 가능한 리소스를 요청했을 때)                        |
| 403      | 유저 인증상태와 관계 없이 응답하고 싶지 않은 리소스를 클라이언트가 요청했을 때 사용하는 응답 코드 |
|          | (403 보다는 400이나 404를 사용할 것을 권고. 403 자체가 리소스가 존재한다는 뜻이기 때문에)         |
| 405      | 클라이언트가 요청한 리소스에서는 사용 불가능한 Method를 이용했을 경우 사용하는 응답 코드          |

| 상태코드 |                                                                           |
| -------- | ------------------------------------------------------------------------- |
| 301      | 클라이언트가 요청한 리소스에 대한 URI가 변경 되었을 때 사용하는 응답 코드 |
|          | (응답 시 Location header에 변경된 URI를 적어 줘야 합니다.)                |
| 500      | 서버에 문제가 있을 경우 사용하는 응답 코드                                |

[참고블로그](https://meetup.toast.com/posts/92)

GET 조회
POST 등록
PUT 수정
DELETE 삭제

GET /users/1 : id: 1인 사용자 정보 반환
POST /articles/1 id: 1인 게시글 반환
PUT /articles/1 id : 1인 게시글 수정

### axios

```jsx
import axios from 'axios';
axios.get('./users/1');
```

### JSONPlaceholder

### useStage 와 useEffect로 데이터 로딩

1. 요청의 결과
   ```jsx
   const [users, setUsers] = useState(null);
   ```
2. 로딩 상태
   ```jsx
   const [loading, setLoading] = useState(false);
   ```
3. 에러
   ```jsx
   const [error, setError] = useState(null);
   ```

```jsx
function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/',
        );
        setUsers(response.data);
      } catch (e) {
        setError(e);
      }
    };
    fetchUsers();
  }, []);
  return <div></div>;
}
```

useEffect 사용하여 컴포넌트 처음 rendering 될 때 fetchUsers 호출
Users, Error 값을 초기화
요청 성공 시 setUsers 값 바꾸고 cathUsers 통해 data 바꾸고
setLoading 통해 로딩 끝남을 알림

```jsx
{
  users.map((user) => <li key={user.id}></li>);
}
```

- map 값에는 key 값이 **무조건**존재 해야 함

- 에러 값 확인하고 싶다면

  ```jsx
  console.log(e.response.status);
  ```

- button 형식으로 만들어주고 싶다면 만든 함수를 useEffect 밖으로 꺼내주면 된다.

### useReducer로 요청 상태 관리하기

처음 코드의 양은 늘어날 수 있음

로직을 분리하여 나중에 사용가능

- reducer 에서 swtich로 구현한 목록에 없을 시 state를 반환 시켜도 되지만 보통 error를 throw 한다

- 장점 : 파일로 빼내서 사용 가능
  reducer의 이름을 바꾼 뒤 리펙터링

### useAsync 커스텀 Hook 만들어서 사용하기

```jsx
function useAsync(callback, deps = []) {}
```

callback -> api 호출 함수

deps -> 어떤 값이 변경 되었을 때 api 재요청

- useCallback 이용하여 재사용 가능하게 가능
  ```jsx
  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }, [callback]);
  ```

사용자 요청이 있을 때만 수정 하는 법

useEffect 부분에 if(skip) return

```jsx
useEffect(() => {
      if (skip) {
          return;
      }

```

- 초기값이 잘못 설정되어 있으면 위의 오류는 없지만 위의 값이 불러와 지지 않는다.

- 특정 par 불러와서 호출하고 싶은 경우
  ```jsx
  const [state] = useAsync(() => getUser(id), [id]);
  ```
  id 값이 바뀔 때 마다 getUser 함수를 호출하겠다는 의미

```jsx
import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
```
