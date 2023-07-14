/* eslint-disable max-len */
// Middleware function for logging incoming requests
const requestLogger = (req, res, next) => {
  console.log('Received request:', req.method, req.originalUrl);
  next(); // Call next to pass the control to the next middleware or route handler
};

module.exports = requestLogger;
