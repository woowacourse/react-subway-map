import styled from '@emotion/styled';
import { COLOR } from '../../constants/styleConstant';
import { Line } from '../../interfaces';

export const StationListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.5rem;
  width: 100%;
`;

export const StationWrapper = styled.div`
  display: flex;
`;

export const Form = styled.form``;

export const Input = styled.input`
  width: 20rem;
  height: 2rem;
  padding: 0.25rem 0.2rem;
  margin: -1rem 0;
  border-color: ${COLOR.GRAY_400};
  border-width: 0.1rem;
  border-radius: 0.25rem;
`;

export const ConfirmButton = styled.button`
  width: 3rem;
  height: 2rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  border: none;
  border-radius: 0.25rem;
  color: white;
  margin-left: 0.5rem;
  background-color: ${({ theme }) => theme.primaryColor};
`;

export const CancelButton = styled.button`
  width: 3rem;
  height: 2rem;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  border: none;
  border-radius: 0.25rem;
  color: white;
  margin-left: 0.5rem;
  background-color: ${COLOR.RED_400};
`;

export const TransferLineCircleContainer = styled.div`
  display: flex;
`;

export const Name = styled.div`
  line-height: 1rem;
  width: 100%;
  margin-right: 0.4rem;
`;

export const TransferLineCircle = styled.div<{ color: Line['color'] }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0 0.1rem 0 0.1rem;
  background-color: ${({ color }) => color};
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonImage = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
