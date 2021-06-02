import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 12px;
  color: ${PALETTE.DARK_GRAY};
  margin-right: auto;
  margin-bottom: 2px;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export default { Container, ButtonsContainer, Title };
