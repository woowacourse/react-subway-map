import styled from '@emotion/styled';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ hasExtra }: { hasExtra: boolean }) =>
    hasExtra ? 'space-between' : 'center'};

  & > h3 {
    font-size: 1.75rem;
  }
`;

export { Container };
