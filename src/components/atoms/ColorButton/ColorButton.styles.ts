import styled from '@emotion/styled';

const Container = styled.button`
  width: 30px;
  height: 30px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};

  && {
    margin-right: 4px;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;

export { Container };
