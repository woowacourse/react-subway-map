import request from './request';

export const signUp = async ({ email, age, password }) => {
  try {
    const response = await request.post('/members', { email, age, password });

    if (response.status !== 201) {
      throw new Error(response.status);
    }
  } catch (error) {
    // TODO: 중복된 이메일 처리
    console.error(error);
  }
};

// export const checkDuplicateEmail = async () => {};
