import styled from 'styled-components';

export const SectionPage = styled.div`
  margin: 2rem 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 320px;
  max-width: 768px;
`;

export const FormContainer = styled.div`
  margin-bottom: 1rem;
`;

export const HeaderText = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2rem;
`;

export const LineSelectWrapper = styled.div`
  margin-top: 2rem;
`;

export const LoginMessage = styled.p`
  text-align: center;
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

export const ButtonList = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;

  & button {
    margin: 0 2em;
  }
`;

export const LineHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const LineName = styled.h3`
  font-size: 28px;
  margin: 0;
  margin-left: 1rem;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.color.border.secondary};
  border-radius: 5px;
`;

export const Item = styled.li`
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StationName = styled.span`
  margin-left: 0.8em;
  font-size: 1.1rem;
`;

export const OptionWrapper = styled.div``;

export const Form = styled.form`
  margin: 1rem 0;
`;

export const InputWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin-bottom: 3rem;

  label {
    flex: 1;
  }

  svg {
    height: 30px;
  }
`;
