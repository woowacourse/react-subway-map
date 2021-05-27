import styled from 'styled-components';
import { List } from '../../components/shared';
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

const StationList = styled(List)`
  p > * {
    margin-left: 0.3rem;
  }

  p > span:first-child {
    margin-left: 0.6rem;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: ${PALETTE.GRAY_500};
`;

const LineCategory = styled.div`
  width: 25rem;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 0 0 1rem;

  div {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;

    > *:first-child {
      margin-right: 0.2rem;
    }
  }
`;

export { Container, Form, Text, StationList, LineCategory };
