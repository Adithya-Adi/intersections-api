/* eslint-disable max-len */
// Middleware function for header-based authentication
const authenticate = (req, res, next) => {
  // Get the authorization header and authentication token from environment variables
  const authHeader = req.headers['authorization'];
  const authToken = process.env.AUTH_TOKEN;

  // Check if the auth header is missing or unauthorized
  if (!authHeader || authHeader !== authToken) {
    const error = new Error('Auth Header is Missing / Unauthorized');
    error.statusCode = 400;
    throw error;
  }

  // Authentication successful, pass control to the next middleware or route handler
  next();
};

module.exports = authenticate;
