import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const SelectServerMessage = styled.div<{ isVisible: boolean }>`
  margin-bottom: 12px;
  color: ${PALETTE.RED};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

export default { Container, ButtonsContainer, SelectServerMessage };
