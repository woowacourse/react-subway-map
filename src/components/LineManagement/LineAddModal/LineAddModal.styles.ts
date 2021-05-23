import styled from 'styled-components';
import Container from '../../@common/Container/Container.styles';
import Input from '../../@common/Input/Input';

export const StyledInput = styled(Input)`
  margin-bottom: 1.5rem;
`;

export const StyledContainer = styled(Container)`
  margin-bottom: 1.5rem;
`;

export const BidirectionArrowIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/icons/bidirection-arrow.svg`,
})`
  margin: 0 1rem;
`;
