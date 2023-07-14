const errorHandler = (err, req, res, next) => {
  console.error(
      'Error: Status Code:',
      err.statusCode,
      ' Message:', err.message,
  );
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({message});
};

module.exports = errorHandler;
