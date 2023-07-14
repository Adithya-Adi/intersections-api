// Middleware function for handling errors
const errorHandler = (err, req, res, next) => {
  console.error(
      'Error: Status Code:',
      err.statusCode,
      ' Message:', err.message,
  );

  // Determine the status code and error message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Send the JSON response with the status code and error message
  return res.status(statusCode).json({message});
};

module.exports = errorHandler;
