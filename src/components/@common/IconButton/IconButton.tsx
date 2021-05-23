import styled from 'styled-components';

export interface IconButtonProps {
  iconUrl: string;
}

const IconButton = styled.button<IconButtonProps>`
  background-image: url(${({ iconUrl }) => iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: visible;
  position: relative;
  width: 20px;
  height: 20px;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default IconButton;
