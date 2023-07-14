const requestLogger = (req, res, next) => {
  console.log('Received request:', req.method, req.originalUrl);
  next();
};

module.exports = requestLogger;
