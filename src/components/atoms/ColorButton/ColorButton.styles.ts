import styled from '@emotion/styled';

const Container = styled.button`
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
`;

export { Container };
