# CSS MODULE

따로 초기 설정 필요 없음
-> 이미 설정이 되어있기 때문에

### react-icons 설치

yarn add react-icons

[ReactICONS](https://react-icons.github.io/react-icons/)

```jsx
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
```

- 컴포넌트 형으로 선언 가능
  ```jsx
  <div>{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</div>
  ```

* custom checkbox 만드는 방법 중 하나

  ```css
  .checkbox input {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
  }
  ```

* class 안 두개 이상의 객체

  1. ```jsx
     yarn add classnames
     ```

  2. ```jsx
     import classNames from 'classnames/bind';
     ```

  3. ```jsx
     const cx = classNames.blnd(styles);
     ```
  4. ```jsx
     <div className={cx('checkbox', 'new', color)}>
     ```
     다음과 같이 선언

* scss로도 사용 가능
  node-sass 설치
* css style global 설정
  ```css
  :global .my-global-name {
  }
  ```
  global-> local 로 설정 시 특정 클래스에서만 고유 이름을 사용
