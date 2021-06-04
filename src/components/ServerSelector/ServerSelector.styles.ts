import styled from 'styled-components';

export const FABWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

export const Form = styled.form`
  margin: 1rem 0;
`;

export const FormMessage = styled.p`
  font-size: 14px;
  line-height: 1em;

  svg {
    height: 1.2em;
    vertical-align: middle;
    margin-right: 0.2em;
  }
`;
