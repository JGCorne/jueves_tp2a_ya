// Ejercicio 1.1 — Callback
import { libros } from "../data/libros.js";

export function buscarLibroPorId(id, callback) {
  setTimeout(() => {
    const libro = libros.find((l) => l.id === id);
    if (!libro) {
      callback(new Error(`No existe el libro con id ${id}`), null);
      return;
    }
    callback(null, libro);
  }, 500);
}

buscarLibroPorId(1, (error, libro) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Encontrado:", libro.titulo);
});

buscarLibroPorId(99, (error, libro) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("Encontrado:", libro.titulo);
});
