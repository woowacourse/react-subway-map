export const requestSignup = jest.fn(() => Promise.resolve());

export const requestLogin = jest.fn(async () => ({
  data: {
    accessToken: 'responseAccessTokenTest',
  },
}));
