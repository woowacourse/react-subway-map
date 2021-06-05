import { NavLink } from "react-router-dom";

import Button from "../Button/Button";
import { NavigationBlock } from "./Navigation.styles";

interface route {
  isPrivate?: boolean;
  to: string;
  title: string;
}

interface Props {
  routes: route[];
  isAuthenticated: boolean;
}

const Navigation = ({ routes, isAuthenticated }: Props) => (
  <NavigationBlock>
    {routes
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
