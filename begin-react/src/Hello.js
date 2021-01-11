import React, { Component } from 'react';

class Hello extends Component {
  static defaultProps = {
    name: '이름없음',
  };
  render() {
    const { isSpecial, color, name } = this.props;
    return (
      <div style={color}>
        {isSpecial && <b>*</b>}
        안녕하세요 {name}
      </div>
    );
  }
}

// function HelloWolrd({ color, name, isSpecial }) {
//   console.log();
//   return (
//     <div
//       style={{
//         color,
//       }}
//     >
//       <b>{isSpecial ? '스페셜' : '낫스페셜'}</b>
//       안녕하세요{name}
//     </div>
//   );
// }

// Hello.defaultProps = {
//   name: '이름없음',
// };
export default Hello;
