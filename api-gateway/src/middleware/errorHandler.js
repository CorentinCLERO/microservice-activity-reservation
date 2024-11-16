const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorResponse = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  res.status(errorResponse.status).json(errorResponse);
};

module.exports = errorHandler;