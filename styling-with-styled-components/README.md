# Styled-components

### Template Literal

문자열 안에 특정 자바 스크립트 값을 조합하여 사용
**객체**나 **함수** 넣으면 제대로 동작하지 않음

```jsx
const red = '빨간색';
const blue = '파란색';
function favoriteColors(texts, ...values) {
  console.log(texts);
  console.log(values);
}
favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`;
```

rest 문법 사용
texts, values 값들 분리

용도 : 특정 element에
