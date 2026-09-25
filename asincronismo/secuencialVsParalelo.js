// Ejercicio 3 — Secuencial vs paralelo
import { obtenerLibroPorIsbn } from "./openLibrary.js";

// "9780393312838" (sugerido en la consigna) hoy da 404 en Open Library; se usa otro ISBN real.
const isbns = ["9780307474728", "9780345391803", "9780140449136", "9780061120084", "9780452284234"];

async function buscarSecuencial(isbns) {
  const resultados = [];
  for (const isbn of isbns) {
    resultados.push(await obtenerLibroPorIsbn(isbn));
  }
  return resultados;
}

async function buscarParalelo(isbns) {
  return Promise.all(isbns.map((isbn) => obtenerLibroPorIsbn(isbn)));
}

try {
  console.time("secuencial");
  const sec = await buscarSecuencial(isbns);
  console.timeEnd("secuencial");

  console.time("paralelo");
  const par = await buscarParalelo(isbns);
  console.timeEnd("paralelo");

  console.log(par.map((l) => l.titulo));
} catch (error) {
  console.error("Error:", error.message);
}

// Conclusión:
// - Secuencial tarda la SUMA de los 5 pedidos: cada await espera que termine el anterior
//   antes de lanzar el siguiente.
// - Paralelo tarda lo que tarde el pedido MÁS LENTO: los 5 fetch se lanzan juntos y
//   Promise.all espera a que terminen todos.
// - NO conviene Promise.all cuando un pedido depende del resultado del anterior, cuando
//   son muchísimos pedidos a la vez (se puede saturar/limitar la API), o cuando no querés
//   que un solo error descarte todos los resultados (ahí va Promise.allSettled).
