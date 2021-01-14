--- 
title: [Markdown}"SPI STUDY"
output:
   html_document :
   toc : true
---

# SPI

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

### 기본설정(Browser Router)

1. yarn add react-router-dom
2. index.js
   ```jsx
   import { BrowserRouter } from 'react-router-dom';
   ```
3. BrowerRouter로 감싸기
   ```jsx
   <BrowserRouter>
     <App />
   </BrowserRouter>
   ```
4. 선언

   ```jsx
   <Route path="/" component={Home} />
   <Route path="/about" component={About} />
   ```

   - 위와 같이 선언하면 브라우저의 about이라는 경로가 /, /about에도 일치해서 두개에서 나옴
     -> ```jsx
     <Route path="/" component={Home} exact/>

     ```

     ```

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
