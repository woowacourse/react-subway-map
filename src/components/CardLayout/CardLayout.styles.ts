import styled from '@emotion/styled';

const Container = styled.div`
  width: 640px;
  min-height: 720px;
  margin: auto;
  margin-top: 120px;
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

const Divider = styled.hr`
  height: 2px;
  border-width: 0px;
  background-color: #808080;
`;

export default { Container, Title, Divider };
