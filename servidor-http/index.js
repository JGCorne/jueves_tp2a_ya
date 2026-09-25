const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PUERTO = 3000;
const RUTA_LIBROS = path.join(__dirname, "..", "biblioteca-api", "data", "libros.json");

function responderJson(res, status, cuerpo) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(cuerpo));
}

function leerBody(req) {
  return new Promise((resolve, reject) => {
    let crudo = "";
    req.on("data", (chunk) => (crudo += chunk));
    req.on("end", () => {
      try {
        resolve(crudo ? JSON.parse(crudo) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

const servidor = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  try {
    if (req.method === "GET" && req.url === "/") {
      return responderJson(res, 200, { mensaje: "Biblioteca API" });
    }

    if (req.method === "GET" && req.url === "/libros") {
      const libros = JSON.parse(await fs.readFile(RUTA_LIBROS, "utf-8"));
      return responderJson(res, 200, libros);
    }

    // Desafío opcional: devolver el body tal cual llegó
    if (req.method === "POST" && req.url === "/eco") {
      try {
        const body = await leerBody(req);
        return responderJson(res, 200, body);
      } catch {
        return responderJson(res, 400, { error: "El body no es JSON válido" });
      }
    }

    responderJson(res, 404, { error: "Ruta no encontrada" });
  } catch (error) {
    console.error(error);
    responderJson(res, 500, { error: "Error interno del servidor" });
  }
});

servidor.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
