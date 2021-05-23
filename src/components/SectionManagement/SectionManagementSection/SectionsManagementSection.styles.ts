import styled from 'styled-components';
import PALETTE from '../../../constants/palette';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import SelectBox from '../../@common/SelectBox/SelectBox';

export const StyledSectionManagementSection = styled(Container)`
  border: 1px solid ${PALETTE.GRAY_300};
  padding: 2rem;
  border-radius: 0.5rem;
`;

export const SectionAddButton = styled(Button)`
  width: 6rem;
  align-self: flex-end;
`;

export const LineSelectBox = styled(SelectBox)`
  margin: 2rem 0;
`;
