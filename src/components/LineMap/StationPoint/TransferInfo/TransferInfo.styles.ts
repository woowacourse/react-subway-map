import styled, { keyframes } from 'styled-components';
import { Palette } from '../../../../constants/palette';

const animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TransferInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: white;
  border-radius: 7px;
  border: 1px solid ${Palette.GRAY_300};
  top: 0;
  transform: translateY(-90%);
  padding: 1rem;
  width: max-content;
  animation: ${animation} 0.1s ease-in;

  & > .transfer-info-title {
    font-size: 1rem;
    border-radius: 7px;
    background-color: ${Palette.LIME_300};
    padding: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;
