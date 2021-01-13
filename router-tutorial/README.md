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

### 기본설정

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
