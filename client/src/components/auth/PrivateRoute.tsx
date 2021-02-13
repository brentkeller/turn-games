import * as React from 'react';
import { UserContext } from './userContext';
import { Route, Redirect } from 'react-router-dom';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
type PrivateRoutePropTypes = {
  path: string;
  children: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRoutePropTypes> = ({ children, ...rest }) => {
  const { user } = React.useContext(UserContext);
  const isLoggedIn = user !== undefined;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
