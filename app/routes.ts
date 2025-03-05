import { route, index, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('home.tsx'),
  route('details/:id', './details.tsx'),
  route('/*', './404.tsx'),
] satisfies RouteConfig;
