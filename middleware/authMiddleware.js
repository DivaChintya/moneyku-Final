
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const authorization = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return next(new AuthorizationError('Invalid Token'));
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if(error) {
      return next(new AuthorizationError('Invalid Token'));
    }

    req.user = decode;
    next();
  });
};

module.exports = authorization;

