const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Gestion spécifique des erreurs de compensation
  if (err.name === 'CompensationError') {
    return res.status(500).json({
      message: 'Transaction rolled back',
      details: err.message,
      compensationStatus: err.compensationStatus
    });
  }

  const errorResponse = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  res.status(errorResponse.status).json(errorResponse);
};

module.exports = errorHandler;