import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Divider = styled.hr`
  background-color: ${PALETTE.LIGHT_GRAY};
  width: 640px;
  position: absolute;
`;

const LinesContainer = styled.ul`
  margin-top: 24px;
`;

const LineItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0 8px;
  border-bottom: 1px solid ${PALETTE.LIGHT_GRAY};
  height: 48px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const Icon = styled.img`
  width: 20px;
`;

const Color = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 12px;
`;

export default {
  AddButtonWrapper,
  Divider,
  Color,
  LinesContainer,
  LineItem,
  ButtonsContainer,
  Icon,
};
