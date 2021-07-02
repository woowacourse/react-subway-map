export interface RouteShape {
  isPrivate: boolean;
  path: string | string[];
  Component: () => JSX.Element;
}

export interface NavLinkShape {
  isPrivate: boolean;
  to: string;
  title: string;
}
