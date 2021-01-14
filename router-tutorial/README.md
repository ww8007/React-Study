# SPI

# 목차

- [SPI 단점](#SPI-단점)
- [기본설정(Browser Router)](#기본설정)
- [경로 설정](#경로-설정)
- [Memory Router](#memory-router)
- [파라미터와 쿼리](#파라미터와-쿼리)
- [서브 라우트 만들기](#서브-라우트-만들기)
- [리액트 라우터 부가기능](#리액트-라우터-부가기능)
- [history 객체](#history-객체)
- [withRouter](#withRouter)
- [Switch](#switch)
- [useReactRouter Hook 사용하기](#usereactrouter-hook-사용하기)

### SPI 단점

1. 앱의 규모가 커지면 JS 크기가 너무 커질 수 있음
   -> Code Splitting
   기능별로 파일 분리
2. 브라우저에서 js가 실행되지 않으면 파일을 볼수 없음
   -> Sever Side Rendering

라우터 - 컴포넌트 기반으로 라우팅
Next.js - 엄청나게 쉽게 구현 가능
파일 경로, 이름으로 구현

- 주요 컴포넌트

1. BrowserRouter
   HTML5 History API 사용
   주소만 바꾸고 페이지는 다시 불러오지 않음
2. HashRouter
   옛날 기술
   hashtag(#) 옛날 브라우저에서 작동
3. MemoryRouter
   브라우저의 주소와 무관 -> 임베디드 웹앱, 리엑트 네이티브 등에서 사용
4. StaticRouter
   서버 사이드 랜더링에 사용
5. Route
   라우트를 정의할 때 사용하는 컴포넌트
6. Link
   사용한 Router의 주소를 바꿈 a 태그지만 새로고침 안됨
   [[↑] Back to top](#목차)

### 기본설정

1.  yarn add react-router-dom
2.  index.js
    ```jsx
    import { BrowserRouter } from 'react-router-dom';
    ```
3.  BrowerRouter로 감싸기
    ```jsx
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ```
4.  선언

    ```jsx
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    ```

    - 위와 같이 선언하면 브라우저의 about이라는 경로가 /, /about에도 일치해서 두개에서 나옴
      -> ```jsx
      <Route path="/" component={Home} exact/>

           ```

           ```

      [[↑] Back to top](#목차)

### 경로 설정

a 테그 사용 금지

```jsx
<div>
  <ul>
    <li>
      <Link to="/">홈</Link>
    </li>
    <li>
      <Link to="/about">소개</Link>
    </li>
  </ul>
  <hr></hr>
  <Route path="/" component={Home} exact />
  <Route path="/about" component={About} />
</div>
```

[[↑] Back to top](#목차)

### Memory Router

index.js에서 수정

```jsx
import { Memory Router } from 'react-router-dom';
```

### 파라미터와 쿼리

1. 파라미터

- Parameter
  /profiles/jang
  정해진 특정 데이터 조회
- Query
  /filter?type=book&sor_by=date
  검색에 사용

- 컴포넌트를 라우터로 사용하게 된다면 match 값이 자동으로 받아와 진다.
  match params 추출 조회
  ```jsx
  const { username } = match.params;
  ```
  App js 에서 설정한 ```jsx
  <Route path="/profiles/:username">
  ```
  위 의 코드가 match.params로 동작하게 됨
  ```

2. 쿼리

- props를 통해 location을 받아옴

- 추출하는 법
  1.  yarn add qs
  2.  ```jsx
      import qs from 'qs';
      ```
  3.  파싱하기
      물음표가 표시 되어있기 때문에 파싱 사용
      물음표 삭제 -> ignoreQueryPrefix
      ```jsx
      const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      ```
  4.  특정 정보 삽입
      `jsx const detail = query.detail === 'true'; ` - 문자열을 통한 비교를 해줘야 함
      `jsx { detail && <p>detail 값이 true 입니다.</p>; } `
      [[↑] Back to top](#목차)

### 서브 라우트 만들기

- render 장점
  const로 다른 무언가를 선언을 시켰을 때 바로 표시가 가능
  문자로 바로 표현이 가능해서 용이함
- 용도
  특정 경로에 tab이 있는 경우 사용 가능
  목록들 나타내기 최적화

- 사용법
  ```jsx
    <Route
       path="/profiles"
       exact
       render={() => <div>사용자를 선택해주세요</div>}
     ></Route>
     <Route path="/profiles/:username" component={Profile} />
  ```
  [[↑] Back to top](#목차)

## 리액트 라우터 부가기능

### history 객체

route로 사용되는 객체에게 props로 전달
router로 직접 접근 가능
이동, 이탈 방지

- Object

  1.  action -> 라우터에서 가장 마지막으로 발생한 액션
      이동 -> push
      뒤로가기, 앞으로 가기 -> pop
  2.  block -> 사용자가 페이지에서 이탈 방지

      ```jsx
      useEffect(() => {
        console.log(history);
        const unblock = history.block('정말 떠나실 건가요?');
        return () => {
          unblock();
        };
      }, [history]);
      ```

      페이지에서 무언가를 작성하고 있다가 나가려 할 때 물어보는 용도로 사용

  3.  createHref -> location 같은 형태의 객체를 가지고 주소를 만드는 역할
  4.  go -> -1 뒤로 1 앞으로
      goback go Forward 비슷
  5.  replace -> 방문기록을 남기지 않음
      [[↑] Back to top](#목차)

### withRouter

라우터 컴포넌트가 아닌 곳에서
match, location, history 사용가능
라우터로 선언되지 않은 곳에서 특정 경로롤 이동할 때 사용
-> 로그인 성공

- JSON.stringfy

```jsx
<textarea value={JSON.stringify(location, null, 2)}></textarea>
```

위와 같이 선언하면 들여쓰기 가능

- 랜더링 된 match 기준으로 params를 받아옴
- location의 경우는 어디서 받아오든 경우

### Switch

여러 라우트 중 하나만 보여줌

exact가 존재 하지 않는 경우 하나만 보여줌

- 페이지를 못찾았을 때 사용
  not found -> 404
  ```jsx
  <Route
    render={({ location }) => (
      <div>
        <h2>이 페이지는 존재하지 않습니다.</h2>
        <p>{location.pathname}</p>
      </div>
    )}
  />
  ```
  [[↑] Back to top](#목차)

### NavLink

현재 주소와 일치한다면 스타일 바꾸기

```jsx
<li>
  <NavLink
    to="/profiles/homer"
    activeStyle={{ background: 'black', color: 'white' }}
  >
    homer
  </NavLink>
</li>
```

- className으로 확인하고 싶을 시
  -> activeClassName="active"

* isActive
  1st match
  2nd location
  return match.params.blbla = 'asdf';

* Prompt
  historyblock -> Component로 구현

* Redirect
  랜더링 하는 순간 다른 경로로 이동
  history와 같은 기능
  Component

* RoutConfig
  routes 배열 생성
  한번에 생성
  view, angular의 경우 사용

[reactrouter](https://reactrouter.com/)
[[↑] Back to top](#목차)

### useReactRouter Hook 사용하기

정식 개념은 아님

- 설치
  yarn add use-react-router
  [[↑] Back to top](#목차)
