import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const FormWrapper = styled.form`
  margin-bottom: 20px;
`;

const ArrowIcon = styled.div`
  font-size: 1.5rem;
  margin: 10px;
  transform: translateY(25%);
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const DropdownWrapper = styled.div`
  flex: 1;
`;

const Divider = styled.hr`
  height: 1px;
  background-color: ${PALETTE.DARK_GRAY};
  border: none;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const Th = styled.th`
  width: 100%;
  color: ${PALETTE.SUBWAY_YELLOW};
  padding: 14px;
  text-align: center;
  border-bottom: 2px solid ${PALETTE.SUBWAY_YELLOW};
`;

const Tr = styled.tr``;

const Td = styled.td<{ border?: boolean }>`
  padding: 12px;
  border-bottom: ${({ border }) => border && `1px solid ${PALETTE.LIGHT_GRAY}`};
`;

const PathContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
`;

const PathItem = styled.div`
  position: relative;
  background-color: ${PALETTE.SOFT_GRAY};
  padding: 12px;

  font-size: 1.15rem;
  line-height: 1.15rem;
  border-radius: 16px;

  box-shadow: 2px 2px 3px ${PALETTE.LIGHT_GRAY};

  :first-of-type,
  :last-of-type {
    background-color: ${PALETTE.SUBWAY_YELLOW};

    &::before {
      content: '🚇';
      margin-right: 2px;
    }
  }

  &:not(:last-of-type) {
    &::after {
      content: '➡️';
      position: absolute;
      right: -36px;
    }
  }
`;

export default {
  FormWrapper,
  ArrowIcon,
  DropdownContainer,
  DropdownWrapper,
  Divider,
  Table,
  Th,
  Tr,
  Td,
  PathContainer,
  PathItem,
};
