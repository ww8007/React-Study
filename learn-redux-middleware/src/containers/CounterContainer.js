import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase } from '../modules/counter';
function CounterContainer() {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrase = () => {
    dispatch(decrease());
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
