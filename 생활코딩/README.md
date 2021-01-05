# REACT

---

coding -> run -> deploy

npm을 이용한 install과 npmx를 통한 install 존재

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
   document.getElementById("root")
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
    return ();
  }
}
```
