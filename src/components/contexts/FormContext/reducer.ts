export const CHANGE_VALUE = 'CHANGE_VALUE' as const;
export const RESET_FORM = 'RESET_FORM' as const;

export const changeValue = (key: string, value: string) => ({
  type: CHANGE_VALUE,
  payload: {
    key,
    value,
  },
});

export const resetForm = () => ({ type: RESET_FORM });

export type ActionType = ReturnType<typeof changeValue> | ReturnType<typeof resetForm>;
export interface FormState {
  [key: string]: {
    value: string;
  };
}

export const reducer = (state: FormState, action: ActionType) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [action.payload.key]: {
          value: action.payload.value,
        },
      };
    case RESET_FORM:
      return Object.keys(state).reduce((form, key) => {
        return {
          ...form,
          [key]: {
            value: '',
          },
        };
      }, {});

    default:
      throw new Error('unvalid action type');
  }
};
