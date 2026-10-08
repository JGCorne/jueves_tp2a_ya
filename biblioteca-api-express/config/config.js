// Configuración centralizada: lee process.env (cargado con --env-file) y aplica defaults
const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

export { PORT, NODE_ENV };
