import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

function SignInPage() {
  const navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let { from } = location.state || { from: { pathname: '/' } };
  const signin = (event) => {
    event.preventDefault();
    auth
      .signin(email, password)
      .then((authenticated) => {
        if (authenticated) {
          navigate(from);
        }
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <>
      <h1>Sign In</h1>

      {errorMessage && (
        <div className="card large error">
          <p>
            <span className="icon-alert inverse" />
            {errorMessage}
          </p>
        </div>
      )}

      <form
        onSubmit={signin}
        className="input-group vertical"
        style={{ width: '400px' }}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="input-group">
          <button className="primary bordered medium">Sign In</button>
        </div>
      </form>
    </>
  );
}

export default SignInPage;
