const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const authToken = process.env.AUTH_TOKEN;
  if (!authHeader || authHeader !== authToken) {
    const error = new Error('Auth Header is Missing / Unauthorized');
    error.statusCode = 400;
    throw error;
  }
  next();
};

module.exports = authenticate;
