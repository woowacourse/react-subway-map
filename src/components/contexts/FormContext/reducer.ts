export const CHANGE_VALUE = 'CHANGE_VALUE' as const;

export const changeValue = (key: string, value: string) => ({
  type: CHANGE_VALUE,
  payload: {
    key,
    value,
  },
});

type ActionType = ReturnType<typeof changeValue>;

export interface FormState {
  [key: string]: {
    value: string;
  };
}

export const reducer = (state: FormState, { type, payload }: ActionType) => {
  switch (type) {
    case CHANGE_VALUE:
      return {
        ...state,
        [payload.key]: {
          value: payload.value,
        },
      };

    default:
      throw new Error('unvalid action type');
  }
};
