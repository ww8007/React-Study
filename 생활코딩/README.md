# REACT

# <<<<<<< HEAD

> > > > > > > f84a4fc61611b3a5842ba59ae5662d06a034326c

---

coding -> run -> deploy

npm을 이용한 install과 npmx를 통한 install 존재

# <<<<<<< HEAD

## npm install

---

npm install -g create-react-app
create-react-app react-todo

## npx install

---

npx create-react-app react-todo

## npm run start

index.js

```javascript
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### css

index.css -> 파일 수정으로 css 수정 가능

### npm run bulid

배포용 파일 생성

### npx serve -s build

배포용 서버 1회성 생성

### Subject <- Component 생성

```javascript
class Subject extends Component {
  render() {
    return <큰테그>{this.props.이름}</큰테그>;
  }
}
```

### component 폴더 생성후 toc 파일 생성

```javascript
import React, { Component } from 'react';
// 항상 import 해줘야 함
class TOC extends Component {
  render() {
    return 내용들;
  }
}

export default TOC;
// 모든 파일에서 TOC를 가져다 쓸 수 있게 설정
```

### props state

props -> 버튼
사용자가 컴포넌트를 사용하는 입장에서 중요
state -> 내부 장치들
내부 구현에 필요한 데이터들

- props
  read-only
  변경 불가 -> component 밖에서는 수정 가능
- State
  this.setState

둘 다 모두 render() 함수 호출

component 생성
-> props_name="props-value"

내부 state 정보가 알 수 없어야 사용자에게는 편리

constructor 함수 생성 -> 초기화

```js
constructor(props);
{
  super(props);
  this.stae = {
    subject: { title: 'WEB', sub: 'world wide web!' },
  };
}
```

- 테그를 반복문을 사용하여서 생성할 때는 key 값을 자동으로 생성해주게 해야 함
  -> 안하면 console 오류 출력

```js
while (i < data.length) {
  lists.push(
    <li key={data[i].id}>
      <a href={'/content/' + data[i].id}>{data[i].titles} </a>
    </li>,
  );
  i = i + 1;
}
```

react props, state의 값이 바뀌면 state 가지고 있는 component의 render() 함수 호출
-> 화면이 다시 그려짐

- render()
  어떤 html을 그릴건가 하는게 render 함수

### react 클릭 규칙az

onClick()
js와는 다른 문법

### e.preventDefault();

html 창을 새로 띄우는 기능을 막아주는 함수
기본적인 동작 금지

### 클릭으로 웹페이지 바뀌지 않고 동작

1. this.setState({ mode: 'welcome' });
   mode : 'welcom' 이라고 알림
   setState({인자})
2. .bind(this)

### .bind(this)

app 이라는 component 가르키는 객체를 가르키는 객체를 함수로 주입해 함수가 객체가 되도록 함

### state 값을 함수로 변경해야하는 이유

생성자 단계에서는 직접 수정이 가능하지만
동적으로 수정할 때는 함수를 호출하여서 인자를 변경하여야 한다.
-> c++ 객체 개념과 같음
react에서는 생성자 단계에서 바뀐 인자값밖에 인지 못함

```js
this.setState({ mode: 'welcome' });
```

### event 생산자

먼저 컴포넌트의 함수로 this.setState 로 생성자 아닌 함수로 인자 바꿔준 뒤
Suject 호출 하면 Subject.js의 Component의 Subject 안의 a 테그 안 onChangePage() 호출 개념

- 당연한 이야기지만 함수 안 this를 호출할 객체가 있어야지만 .bind(this)가 동작

### App.js

```js
<Subject
  title={this.state.subject.title}
  sub={this.state.subject.sub}
  onChangePage={function () {
    this.setState({ mode: 'welcome' });
  }.bind(this)}
></Subject>
```

### Subject.js

```js
<a
  href="/"
  onClick={function (e) {
    e.preventDefault();
    this.props.onChangePage();
  }.bind(this)}
>
  {this.props.title}
</a>
```

### event

event 에는 target이 존재
e.target -> a tag 가르킴
target.dataset.id -> 해서 인자를 가르키는 객체를 가르킴

### .bind

두번째로 들어온 값을 첫번째 함수의 매개변수 값으로 받아줌
-> 속성을 이용한 매개 변수 전달 방법

```js
<a
  href={'/content/' + data[i].id}
  onClick={function (id, e) {
    // 첫 번째 인자로 넘겨줄 인자 설정
    e.preventDefault();
    this.props.onChangePage(id);
  }.bind(this, data[i].id)}
  // 두 번째 인자로 넘겨줄 인수값 설정
>
  {data[i].titles}{' '}
</a>
```

### props , event

상위 -> 하위 props
하위 -> 상위 event

### redux

데이터 저장소를 하나로 명령하여 다른 모든 데이터를 변경하는게 해둠

### CRUD

Create

Read

Update

Delete

### form tag

```html
<form action="/create_process" method="post"></form>
```

이렇게 선언해야 url에 표시되지 않고 간다

### concat 함수

push는 원본 배열을 수정하여 바꾸지만
concat 사용 시 원본 데이터 수정하지 않고 변동사항만 추가 시켜줌

concat은 return 값을 가짐
-> 복제본을 만든다고 생각하면 됨

지금의 react project는 불합리적 면모

TOC : contents 배열들
rendor() method 호출 되면서 다시 그려지는게 원래 맞음
지금은 모든 상황에서 rendor()가 호출됨
-> 프로그램이 커지게 된다면 문제가 됨
-> react 개발자가

### shouldComponentUpdate()

인자로 newProps, newState 값 가질 수 있음
true 면 render호출
false 면 render 호출 x

```js
shouldComponentUpdate(newProps, newState) {
    console.log('TOC render should');

    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }
```

concat이 아닌 push로 data 값 입력 시
이전 값과 이후 값이 같아지게 되서 rendor가 계속 호출되게 된다.
프로그램이 작아지면 이 문제는 굳이 필요가 없다
-> software가 커지면 문제가 생기게 됨

### 복사 생성

1. 배열의 경우
   var a = [1, 2];
   var b = Array.from(a)
   a 와 b 는 내용은 같지만 본질적으로는 같지는 않음

2. 객체의 경우
   var a = {name:'egoing'};
   var b = Object.assin({}, a);
   a 와 b 는 내용은 같지만 본질적으로는 같지 않음

얕은 복사 생성

### 부가적 immutable.js

모든 명령어가 원본에 대해서 불변해서 장점

input을 했을 때 state 값을 바꿔야만 readonly 상태가 아니게 됨

> > > > > > > f84a4fc61611b3a5842ba59ae5662d06a034326c
