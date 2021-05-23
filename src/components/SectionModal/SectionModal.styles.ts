import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StationInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const DropdownWrapper = styled.div`
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 36px;
`;

export default { Container, StationInputWrapper, DropdownWrapper, ButtonsContainer };
