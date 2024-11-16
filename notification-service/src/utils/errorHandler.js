const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Erreurs de validation
  if (err.name === 'ValidationError') {
      return res.status(400).json({
          success: false,
          error: 'Erreur de validation',
          details: err.message
      });
  }

  // Erreurs SMTP
  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      return res.status(503).json({
          success: false,
          error: 'Service de mail indisponible',
          details: err.message
      });
  }

  // Erreur par défaut
  return res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
};

module.exports = errorHandler;