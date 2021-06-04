import styled from 'styled-components';

export const SearchPage = styled.div`
  margin: 2rem 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 320px;
  max-width: 768px;
`;

export const HeaderText = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2rem;
`;

export const Form = styled.form``;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 2rem 0;

  label {
    flex: 1;
  }

  svg {
    height: 30px;
  }
`;

export const Control = styled.div`
  position: relative;
  padding: 30px 0;
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.color.border.secondary};
`;

export const Result = styled.div``;

export const ResultHeader = styled.h4`
  color: ${({ theme }) => theme.color.bg.primary.default};
  margin: 0;
  padding: 1em;
  text-align: center;
  letter-spacing: 1.1px;
  font-size: 1.2em;
  border-bottom: 2px solid ${({ theme }) => theme.color.bg.primary.default};
`;

export const ResultRow = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.primary};
`;

export const ResultItem = styled.div`
  padding: 1em;
  flex: 1;
  text-align: center;
`;

export const DetailRoute = styled.div`
  margin-top: 1rem;

  svg {
    height: 20px;
  }
`;

export const Station = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top: 0.8rem;
`;

export const StationName = styled.span`
  display: inline-block;
  padding: 0.5em 0.8em;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.color.bg.secondary.active};
`;

export const ArrowWrapper = styled.span`
  display: inline-block;
  line-height: 100%;
  padding: 0 0.5em;
`;
