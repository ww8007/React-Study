import { useReducer, useCallback } from 'react';

function reducer(state, action) {
  //change
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'reset':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
  //reset
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  return [form, onChange, reset];
}

export default useInputs;
