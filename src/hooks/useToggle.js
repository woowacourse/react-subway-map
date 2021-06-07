import { useReducer } from 'react';

const toggleReducer = (state, nextValue) => (typeof nextValue === 'boolean' ? nextValue : !state);

export const useToggle = (initialValue) => {
  return useReducer(toggleReducer, initialValue);
};
