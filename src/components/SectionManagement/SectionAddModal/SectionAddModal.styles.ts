import styled from 'styled-components';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import SelectBox from '../../@common/SelectBox/SelectBox';

export const SectionSelectBox = styled(SelectBox)`
  margin-bottom: 1rem;

  &:first-child {
    margin-right: 2rem;
  }
`;

export const ControlContainer = styled(Container)`
  margin-top: 2rem;
`;

export const CancelButton = styled(Button)`
  box-shadow: none;
`;
