import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.

function PrivateRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.getUser()) {
    // Redirect them to the /signin page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
