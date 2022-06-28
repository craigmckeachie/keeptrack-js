const fs = require('fs');
const express = require('express');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const SECRET_WORD = 'SECRET1234';
const expiresIn = '1h';

const createToken = (payload) => jwt.sign(payload, SECRET_WORD, { expiresIn });
const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, SECRET_WORD, (err, decode) =>
      decode !== undefined ? resolve(decode) : reject(err)
    )
  );

const userCredentials = JSON.parse(
  fs.readFileSync('./api/user-credentials.json', 'UTF-8')
);
const isAuth = ({ email, password }) =>
  userCredentials.users.findIndex(
    (user) => user.email === email && user.password === password
  ) !== -1;

server.post('/auth/signin', (req, res) => {
  const { email, password } = req.body;
  if (isAuth({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken(findUserByEmail(email));
  res.status(200).json({ access_token, success: true });
});

const findUserByEmail = (email) => {
  const userWithPassword = userCredentials.users.find(
    (user) => user.email === email
  );
  const user = { ...userWithPassword };
  delete user.password;
  return user;
};

server.use(/^(?!\/auth).*$/, async (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    await verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access token is invalid or has expired.';
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(4000, () => {
  console.log('Running Auth API Server on port 4000');
});
