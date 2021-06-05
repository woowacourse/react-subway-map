import useChangeEvent from './useChangeEvent';

const useSignUpInput = () => {
  const { value: age, onChange: onChangeAge } = useChangeEvent('');
  const { value: email, onChange: onChangeEmail } = useChangeEvent('');
  const { value: password, onChange: onChangePassword } = useChangeEvent('');
  const { value: passwordCheck, onChange: onChangePasswordCheck } = useChangeEvent('');

  return {
    age,
    onChangeAge,
    email,
    onChangeEmail,
    password,
    onChangePassword,
    passwordCheck,
    onChangePasswordCheck,
  };
};

export default useSignUpInput;
