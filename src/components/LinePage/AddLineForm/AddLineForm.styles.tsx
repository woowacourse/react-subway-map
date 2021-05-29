import styled from '@emotion/styled';
import { COLOR } from '../../../constants/styleConstant';

export const AddLineForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 2.5rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  margin-left: 2rem;
  width: 5rem;
`;

export const Message = styled.div`
  width: 100%;
  height: 1rem;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${COLOR.RED_400};
`;
