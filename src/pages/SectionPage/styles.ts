import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const TopContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const DropdownWrapper = styled.div`
  flex: 1;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 16px;
`;

const AddButton = styled.button`
  width: 52px;
  height: 52px;
  background-color: ${PALETTE.SUBWAY_YELLOW};
  font-size: 1.5rem;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: scale(1.1);
  }
`;

const LineDetail = styled.div`
  width: 100%;
  margin-top: 36px;
`;

const LineName = styled.div`
  height: 52px;
  line-height: 52px;
  padding: 0 16px;
  background-color: ${({ color }) => color};
  font-size: 1.25rem;
  font-weight: 500;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const SectionsContainer = styled.ul`
  border: 1px solid ${PALETTE.LIGHT_GRAY};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const SectionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 24px;

  &:not(:last-child) {
    border-bottom: 1px solid ${PALETTE.LIGHT_GRAY};
  }
`;

const Icon = styled.img`
  width: 20px;
`;

export default {
  TopContainer,
  DropdownWrapper,
  AddButtonWrapper,
  AddButton,
  LineDetail,
  LineName,
  SectionsContainer,
  SectionItem,
  Icon,
};
