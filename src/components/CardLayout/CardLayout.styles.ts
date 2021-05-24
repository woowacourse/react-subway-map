import styled from '@emotion/styled';

export const Container = styled.section`
  width: 640px;
  min-height: 400px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bgColor.defaultWhite};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  border-top: 10px solid ${({ theme }) => theme.color.subwayYellow};
  border-bottom: 10px solid ${({ theme }) => theme.color.subwayGreen};
`;

const Title = styled.h1`
  text-align: center;
`;

const Content = styled.div`
  padding: 20px;
`;

export default { Container, Title, Content };
