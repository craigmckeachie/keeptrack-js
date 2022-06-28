import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

function AccountHeader() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <span style={{ float: 'right', marginRight: 120, marginTop: 30 }}>
      <span className="icon-user" />
      {auth.getUser() ? (
        <>
          <span>Hello, {auth.getUser().email} </span>
          &nbsp;&nbsp;
          <button
            className="buttonLink"
            onClick={() => {
              auth.signout();
              navigate('/');
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <NavLink to="/signin">Sign In</NavLink>
      )}
    </span>
  );
}

export default AccountHeader;
