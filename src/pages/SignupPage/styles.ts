import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const SignupLink = styled.div`
  text-align: center;
  & * {
    color: ${PALETTE.SUBWAY_GREEN};
    padding: 4px;
    &:hover {
      border-bottom: 1px solid ${PALETTE.SUBWAY_GREEN};
    }
  }
  margin-top: 20px;
`;

export default { InputContainer, InputWrapper, ButtonWrapper, SignupLink };
