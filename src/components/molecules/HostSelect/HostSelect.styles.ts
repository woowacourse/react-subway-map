import styled from '@emotion/styled';

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 5%;

  font-size: 1rem;
  font-weight: bold;

  & > span {
    margin-right: 1rem;
  }

  & > select {
    border: 4px solid #1D4ED8;
  }
`;

export { Container };
