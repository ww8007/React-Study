import React from 'react';
import classNames from 'classnames';
import './Button.scss';

// size : large, medium, small
// color : blue, pink, gray
function Button({ children, size, color }) {
  // eslint-disable-next-line no-template-curly-in-string
  return (
    <button className={classNames('Button', size, color)}>{children}</button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
};

export default Button;
