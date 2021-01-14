import React from 'react';
import Counter from '../components/Counter';
import { useSelector } from 'react-redux';
function CounterContainer() {
  const { number, diff } = useSelector((state) => {});
  return <Counter></Counter>;
}

export default CounterContainer;
