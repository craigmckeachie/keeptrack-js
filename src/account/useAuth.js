import React, { useState, useContext, createContext } from 'react';
import jwt_decode from 'jwt-decode';
const baseUrl = process.env.REACT_APP_API_URL;

const authContext = createContext();

// https://stackoverflow.com/a/69058154/48175
// function isTokenExpired(token) {
//   const expiry = JSON.parse(atob(token.split('.')[1])).exp;
//   return Math.floor(new Date().getTime() / 1000) >= expiry;
// }

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const getToken = () => {
    return localStorage.getItem('auth_token') || null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('auth_token', token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
  };

  const getUser = () => {
    return token ? jwt_decode(token) : null;
  };

  const signin = (email, password) => {
    return fetch(baseUrl + '/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', JSON.stringify(data));
        if (data.success) {
          saveToken(data.access_token);
        }
        return data.success;
      })
      .catch((error) => {
        console.log('Error:', error);
        throw new Error('The email or password you have entered is invalid.');
      });
  };

  const signout = () => {
    removeToken();
  };

  return {
    token,
    getUser,
    signin,
    signout,
  };
}
