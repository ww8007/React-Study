import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { decreaseAsync, increaseAsync } from '../modules/counter';
function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrase = () => {
    dispatch(decreaseAsync());
  };
  return (
    <div>
      <Counter
        number={number}
        onIncrease={onIncrease}
        onDecrase={onDecrase}
      ></Counter>
    </div>
  );
}

export default CounterContainer;
