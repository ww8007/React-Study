# 백엔드

#### Node 설치 및 준비

1. node --version
   노드 버전 확인
2. 프로젝트 생성
   yarn init -y
3. yarn add koa
4. 파일 생성 후 node src
   http://localhost:4000/

### 미들웨어

KOA 애플리케이션 - 미들웨어의 배열로 구성

```jsx
app.use;
```

미들웨어 함수를 애플리케이션에 등록

- 구조
  ```jsx
  (ctx, next) => {};
  ```
  1.  par ctx
  2.  next

* 코드 경로에 authorized=1 쿼리 파라미터
  포함되어 있으면 이후 미들에어 처리
  아닐 경우 처리 x

* next 함수 호출 시 Promise 반환
  Koa와 Express 차별화
  next 함수가 반환하는 Promise는 다음에 처리해야 할 미들웨어가 끝나야 완료

### async/await

Koa는 async와 await 정식 지원 문법 사용 가능
Express 또한 사용가능 하지만 오류 처리 부분 미흡(express-async-errors)

```jsx
app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; //unthorized
    return;
  }
  await next();
  console.log('END');
});
```

위의 코드 같이 async await 사용가능

### nodemon 사용

yarn add --dev nodemon

- package.json 추가

* 서버 실행
  yarn start:dev

```jsx
"scripts": {
    "start": "node src",
    "start:dev": "nodemon --watch src/ src/index.js"
  }
```

### koa-router 사용

Koa를 사용할 때도 다른 주소로 요청이 들어올 경우 다른 작업 가능하도록 라우터를 사용해야함

yarn add koa-router

```jsx
//라우터 설정
router.get('/', (ctx) => {
  ctx.body = '홈';
});
router.get('/about', (ctx) => {
  ctx.body = '소개';
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods);
```

### 라우트 파라미터와 쿼리

- 파라미터 설정
  /about/:name 형식으로 콜론(:) 사용하여 라우트 경로 설정
  파라미터가 존재하거나 없을 수 있으면 ? 사용하여 정의

  - 설정한 파라미터는 함수의 ctx.params 객체에서 조회 가능

- URL 쿼리
  쿼리의 경우 ex) /posts/?id=10 같이 요청
  **ctx.query**에서 조회 가능
  쿼리 문자열을 자동으로 객체 형태로 파싱 -> 별도의 파싱함수 필요 x
  문자열 형태의 쿼리 문자열 -> **ctx.querystring** 사용

- 파라미터와 쿼리
  주소를 통해 특정 값을 받아 올 때 사용
  - 파라미터 -> 처리할 작업의 카테고리 고유 ID, 이름
  - 쿼리 -> 어떤 조건을 만족하는 항목

### REST API

HTTP 메서드

1. GET 조회
2. POST 등록, 인증작업
3. DELETE : 삭제
4. PUT : 데이터 새 정보를 통째로 교체
5. PATCH : 데이터의 특정필드를 수정

### 라우트 모듈화

라우트를 한 index.js에 모두 작성하면 코드길이와 유지보수 힘듬

```jsx
const Router = require('koa-router');
const api = new Router();

api.get('/test', (ctx) => {
  ctx.body = 'test 성공';
});
// 라우터 내보내기
module.exports = api;
```

- 라우터 사용할 index.js 에서 use 선언

```jsx
//라우터 설정
const api = require('./api');

router.use('/api', api.routes());
```

### posts 라우트 생성

문자열이 아닌 JSON 객체 반환

```jsx
const Router = require('koa-router');
const posts = new Router();

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.get('/', printInfo);
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.put('/:id', printInfo);
posts.patch('/:id', printInfo);

module.exports = posts;
```

### Postman 설치 및 사용

http://localhost:4000/posts/api

### 컨트롤러 파일 작성

특정 경로에 미들웨어 등록할 때 두번 째 인사에 하수를 선언해서 바로 사용 가능

```jsx
router.get('/', (ctx) => {});
```

하지만 함수의 코드가 길어질 시 가독성 떨어지므로 함수 파일 따로 분리 가능
라우트 처리 함수만 모아둔 곳이 컨트롤러

- API 기능 구현
  yarn add koa-bodyparser

  ```jsx
  const bodyParser = require('koa-bodyparser');
  // 라우터 적용 전에 bodyParser 적용
  app.use(bodyParser());
  ```

### mongoose 이용 MongoDB 실습

- 문서
  RDBMS의 레코드 개념과 비슷
  문서의 데이터 구조는 한 개 이상의 키-값 쌍으로 구성

- MongoDB에서는 컬렉션 안의 데이터가 같은 스키마 x

yarn add mongoose dotenv

- .env 생성
  환경변수 민감 -> gitignore
  PORT=4000
  MONGO_URI=mongodb://localhost:27017/BACKEND

- proccess.env 로 내부 값 레퍼런스 생성
  ```jsx
  const { PORT } = process.env;
  ```

* 포트 사용
  ```jsx
  // 포트가 지정되어있지 안하면 4000사용
  const port = PORT || 4000;
  app.listen(port, () => {
    console.log('Listen to port %d', port);
  });
  ```

### mongoose로 서버와 데이터베이스 연결

```jsx
const mongoose = require('mongoose');
// 비구조 할당을 통해 porcess.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

const api = require('./api');

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });
```

### esm으로 ES모듈 import/export 문법 사용하기

yarn add esm

### 데이터베이스의 스키마와 모델

스키마 - 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형태로 정의 되는지 정의하는 객체
모델 - 스키마를 사용하여 만드는 인스턴스 데이터베이스에서 실제작업을 처리할 수 있는 **함수** 지니는 객체

- 스키마를 만들 때는 mongoose 모듈 Schema 사용하여 정의
  기본값 : default

### 모델 생성

모델 인스턴스 생성 후 export default로 내보냄

mode(1, 2)

1. 스키마 이름
2. 스키마 객체(위에 선언)

- 데이터베이스는 스키마 이름을 정해주면 그 이름의 복수 형태로 데이터베이스 컬렉션 이름 생성

ex) Post -> posts(컬렉션이름)

- 만약 권장되는 위의 컨벤션 사용하고 싶지 않다면 세번째 인자로 전달

### 데이터 생성

포스트의 인스턴스 만들 때 new 키워드 사용
생성자 함수의 파라미터에 정보를 지닌 객체 삽입

- 인스턴스를 만들었다 해서 바로 데이터 베이스 저장이 아닌 save() 함수 통해 저장
- 함수의 반환값 : Promise -> async/await 문법 사용하여 저장할 때 까지 대기

1. write

```jsx
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

2. list

```jsx
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

3. read - get by id

```jsx
/*
  GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

4. delete

```jsx
/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

5. update

```jsx
export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값 설정시 업데이트 데이터 반환
      // false 일 때 업데이트 전의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
```

### 요청 검증

ObjectId 검증

```jsx
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
ObjectId.isValid(id);
```

yarn add @hapi/joi

yarn add bcrypt

yarn add jsonwebtoken
