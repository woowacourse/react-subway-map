import styled from 'styled-components';
import PALETTE from '../../constants/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  min-height: 70vh;
`;

const Form = styled.form`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: ${PALETTE.GRAY_500};
`;

const List = styled.ul`
  max-height: 45vh;
  overflow: auto;

  li {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.25rem;
    border-bottom: 1px solid ${PALETTE.GRAY_100};

    p {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    button {
      margin-left: 0.5rem;
    }
  }
`;

export { Container, Form, List, Text };
