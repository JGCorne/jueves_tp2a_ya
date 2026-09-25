// Ejercicio 2 — Consumir una API externa (Open Library)
import { pathToFileURL } from "node:url";

export async function obtenerLibroPorIsbn(isbn) {
  const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  if (!response.ok) {
    throw new Error(`ISBN no encontrado en Open Library: ${isbn} (HTTP ${response.status})`);
  }
  const data = await response.json();
  return { titulo: data.title, cantidadPaginas: data.number_of_pages };
}

// Solo se ejecuta si se corre este archivo directamente (no al importarlo desde otro)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const isbn of ["9780307474728", "0000000000000"]) {
    try {
      const libro = await obtenerLibroPorIsbn(isbn);
      console.log(`${isbn} ->`, libro);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}
