interface RouteShape {
  isPrivate: boolean;
  path: string | string[];
  Component: () => JSX.Element;
}

interface NavLinkShape {
  isPrivate: boolean;
  to: string;
  title: string;
}

export type { RouteShape, NavLinkShape };
