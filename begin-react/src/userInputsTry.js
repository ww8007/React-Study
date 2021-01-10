import { useReducer, useCallback } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'return':
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = '';
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: 'change', name, value });
  }, []);
  const reset = useCallback(() => {
    dispatch({ type: 'return' });
  }, []);

  return [form, onChange, reset];
}

export default useInputs;
