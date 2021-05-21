import styled from 'styled-components';

export const SignUpPage = styled.div``;

export const CardWrapper = styled.div`
  position: absolute;
  width: 50%;
  min-width: 320px;
  max-width: 500px;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HeaderText = styled.h2`
  margin: 0;
  margin-bottom: 2em;
  text-align: center;
  font-size: 2rem;
`;

export const Form = styled.form`
  margin: 2rem 0;
`;

export const FormItem = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const SignUpButton = styled.div`
  margin-bottom: 1rem;
`;
