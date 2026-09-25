// Ejercicio 1.2 — Promesa
import { libros } from "../data/libros.js";

export function buscarLibroPorId(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const libro = libros.find((l) => l.id === id);
      if (!libro) {
        reject(new Error(`No existe el libro con id ${id}`));
        return;
      }
      resolve(libro);
    }, 500);
  });
}

buscarLibroPorId(2)
  .then((libro) => console.log("Encontrado:", libro.titulo))
  .catch((error) => console.error("Error:", error.message));

buscarLibroPorId(99)
  .then((libro) => console.log("Encontrado:", libro.titulo))
  .catch((error) => console.error("Error:", error.message));
