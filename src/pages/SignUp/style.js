import styled from 'styled-components';
import { COLOR } from '../../constants';
import { Flex } from '../../styles';

export const Content = styled.div`
  ${Flex({ direction: 'column', items: 'center' })}
  padding: 12px 48px 36px 48px;
`;

export const Form = styled.form`
  width: 500px;
`;

export const Validator = styled.div`
  height: 32px;
  padding: 0 8px;

  color: ${COLOR.RED};
`;
