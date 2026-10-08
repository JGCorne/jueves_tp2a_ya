import AppError from "../errors/AppError.js";

// 4 parámetros: así Express lo reconoce como manejador de errores. Va último en index.js.
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    });
  }

  // express.json() no pudo parsear el body: es un error del cliente, no un bug nuestro
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: { code: "INVALID_JSON", message: "Request body is not valid JSON" },
    });
  }

  // Error inesperado (bug): log completo para el desarrollador, respuesta genérica para el cliente.
  console.error(err);
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" },
  });
}
