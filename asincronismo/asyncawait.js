// Ejercicio 1.3 — async/await
import { libros } from "../data/libros.js";

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function buscarLibroPorId(id) {
  await esperar(500);
  const libro = libros.find((l) => l.id === id);
  if (!libro) throw new Error(`No existe el libro con id ${id}`);
  return libro;
}

async function main() {
  for (const id of [3, 99]) {
    try {
      const libro = await buscarLibroPorId(id);
      console.log("Encontrado:", libro.titulo);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

main();

// Conclusión: async/await es la más fácil de leer — se lee de arriba a abajo como código
// síncrono y los errores se manejan con un try/catch común. El callback obliga a chequear
// el error a mano en cada llamada, y la promesa mejora eso pero agrega .then/.catch.
