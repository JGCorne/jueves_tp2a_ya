export function notFound(req, res) {
  res.status(404).json({
    error: {
      code: "RUTA_NO_ENCONTRADA",
      message: `No existe la ruta ${req.method} ${req.originalUrl}`,
    },
  });
}
