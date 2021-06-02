export const handleRejected = (state, { payload: { error } }) => {
  state.error = error;
};
