import React from 'react';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import { isSessionValid } from '../../session';

interface ProtectRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps>;
}

export const ProtectedRoute = (
  { component: Component }: ProtectRouteProps,
  ...rest: Partial<RouteProps>[]
) => {
  return (
    <Route
      {...rest}
      render={(matchProps) =>
        isSessionValid() ? <Component {...matchProps} /> : <Redirect to='/' />
      }
    />
  );
};
