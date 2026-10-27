function notFoundHandler(req, res) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found.' } });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: {
      code: status >= 500 ? 'INTERNAL_SERVER_ERROR' : (error.code || 'REQUEST_ERROR'),
      message: status >= 500 ? 'An unexpected error occurred.' : error.message,
    },
  });
}

module.exports = { notFoundHandler, errorHandler };
