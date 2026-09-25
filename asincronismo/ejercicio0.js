// Ejercicio 0 — Predecir el Event Loop
//
// Predicción: A, D, F, C, E, B
//
// - A: síncrono.
// - setTimeout encola B en la macrotask queue (va último).
// - .then encola C en la microtask queue.
// - saludar() imprime D de forma síncrona; `await null` encola el resto (E) como microtask, después de C.
// - F: síncrono.
// - Call Stack vacío -> se vacían las microtasks en orden: C, E.
// - Recién después la macrotask: B.

console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

async function saludar() {
  console.log("D");
  await null;
  console.log("E");
}
saludar();

console.log("F");
