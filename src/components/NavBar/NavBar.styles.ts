import styled from '@emotion/styled';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.bgColor.defaultWhite};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Logo = styled.img`
  width: 160px;
  height: auto;
  cursor: pointer;
`;

const NavItemList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  margin-left: auto;
  font-size: 1.4rem;
  padding: 8px 16px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }
  &:hover {
    border-radius: 8px;
    background-color: ${({ theme }) => theme.bgColor.defaultCream};
  }
`;

export default { Container, Logo, NavItemList, NavItem };
