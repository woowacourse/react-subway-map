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

export { Container, Form, Text, StationList };
