# 리엑트 스타일링 하기

### Sass

Syntactically awesome stylesheets
CSS preprocessor
가독성 up 유지보수 easy
확장자

1. sass
   세미콜론 x 대괄호 x
   기본적으로 좀 헷갈림
2. scss
   css 문법과 유사

### setting

- 5.0.0 버전 충돌 일어나서 이전 버전 설치
  yarn add node-sass@4.14.1
- Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (88)
  npm install -g --production windows-build-tools

-

### scss

변수 -> $

주석 -> //

- flex 개념
  [FLEXBOXFROGGY](https://flexboxfroggy.com/#ko)

```css
align-items: center;
justify-content: center;
```

rem -> 기본 폰트 사이즈 기반 \* 설정 값

- 가상 선택자 이용 hover 10퍼센트 밝게

```css
&:hover {
  background-color: lighten($blue, 10%);
}
```

- 설정한 css 자동으로 불러오기
  ctrl + space -> 선택

### 다양한 버튼 사이즈

- 배열 jolin 이용한 생성

```jsx
<button className={['Button', size].join(' ')}>
```

- 리터럴 이용

```jsx
<button className={'Button ${size}'}>
```

- className libraray 이용
  yarn add class names
  다양한 조합을 사용가능
  ```jsx
  return <button className={classNames('Button', size)}>{children}</button>;
  ```

* size 명시 방법

  1. defaultProps
     ```jsx
     Button.defaultProps = {
       size: 'medium',
     };
     ```
  2. 함수 부분에 명시
     ```jsx
     function Button({ children, size = 'medium' })
     ```
  3. or 연산자 사용
     size || 'medium'

* &연산자

자기 자신을 가르키게 됨

```css
&:hover -> .Button:hover
```

- 여백 주기
  1. 바깥 쪽에 설정
  ```css
  .Button + .Button{
  margin-left: 1rem;
  }
  2. 안쪽에 설정
  ```

### 다양한 버튼 색상

open-color

[opencolor](https://yeun.github.io/open-color/)

비슷한 코드 반복
-> mixcss
