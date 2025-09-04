export function notFound(req, res, next) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err, req, res, next) {
  console.error('Error:', err?.stack || err);
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({ error: err?.message || 'Server error' });
}
