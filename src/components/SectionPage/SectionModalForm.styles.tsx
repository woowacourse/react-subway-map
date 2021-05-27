import styled from '@emotion/styled';
import { COLOR } from '../../constants/styleConstant';

export const SectionModalForm = styled.form`
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

  margin-bottom: 1.5rem;
`;

export const SelectInputWrapper = styled.div`
  width: 100%;
  height: 3rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Message = styled.div<{ textAlign?: 'left' | 'center' | 'right' }>`
  width: 100%;
  height: 1rem;
  padding-left: 1.25rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${COLOR.RED_400};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`;

export const Arrow = styled.div`
  margin: 0 1rem;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ButtonWrapper = styled.div`
  padding-left: 1.5rem;
  width: 12rem;
`;
