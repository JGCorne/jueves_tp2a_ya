const fs = require("fs/promises");
const path = require("path");

const RUTA_LIBROS = path.join(__dirname, "data", "libros.json");

async function listarLibros() {
  const contenido = await fs.readFile(RUTA_LIBROS, "utf-8");
  return JSON.parse(contenido);
}

async function buscarPorId(id) {
  const libros = await listarLibros();
  return libros.find((libro) => libro.id === id);
}

async function buscarPorAutor(autor) {
  const libros = await listarLibros();
  return libros.filter((libro) => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

async function contarConStock() {
  const libros = await listarLibros();
  return libros.filter((libro) => libro.stock > 0).length;
}

async function agregarLibro(libro) {
  const libros = await listarLibros();
  const id = libros.length === 0 ? 1 : Math.max(...libros.map((l) => l.id)) + 1;
  const nuevo = { id, ...libro, fechaAlta: new Date().toISOString().slice(0, 10) };
  libros.push(nuevo);
  await fs.writeFile(RUTA_LIBROS, JSON.stringify(libros, null, 2));
  return nuevo;
}

module.exports = { listarLibros, buscarPorId, buscarPorAutor, contarConStock, agregarLibro };
