import styled from '@emotion/styled';

const Container = styled.img<{ isLoading: boolean }>`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
`;

export default { Container };
