import { NavLink } from "react-router-dom";

import Button from "../Button/Button";
import { NavigationBlock } from "./Navigation.styles";
import { NavLinkShape } from "../../types/route";

interface Props {
  links: NavLinkShape[];
  isAuthenticated: boolean;
}

const Navigation = ({ links, isAuthenticated }: Props) => (
  <NavigationBlock>
    {links
      .filter(({ isPrivate }) => isPrivate === isAuthenticated)
      .map(({ to, title }) => (
        <NavLink to={to} key={to}>
          <Button type="button" buttonTheme="white" kind="rect">
            {title}
          </Button>
        </NavLink>
      ))}
  </NavigationBlock>
);

export default Navigation;
