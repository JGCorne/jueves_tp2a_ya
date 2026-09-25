import { sumar, promedio } from "./matematica.js";

console.log("sumar(2, 3) =", sumar(2, 3));
console.log("promedio([4, 8, 9]) =", promedio([4, 8, 9]));

// Diferencias con libroService.js (CommonJS): `export function` en vez de `module.exports = {...}`,
// `import { } from` en vez de `require()`, la ruta necesita la extensión `.js`, y hace falta
// "type": "module" en el package.json (además no existe __dirname).
