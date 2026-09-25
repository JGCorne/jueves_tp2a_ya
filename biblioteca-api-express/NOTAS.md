# Notas — Clase 4

## Ejercicio 1.5

- Se instaló **Express 5.2.1**, anotado como `"express": "^5.2.1"`.
- El `^` (caret) permite que `npm install` traiga cualquier versión **MINOR o PATCH** más nueva dentro del mismo MAJOR (`>=5.2.1 <6.0.0`), pero nunca un 6.x, que podría traer cambios incompatibles. (`~` solo dejaría pasar PATCH: `>=5.2.1 <5.3.0`; sin símbolo, exactamente 5.2.1.)

## Desafío: PUT vs PATCH e idempotencia

Idempotente = mandar la misma request 1 o N veces deja el servidor en el mismo estado.

- **PUT** es idempotente por definición: reemplaza el recurso entero por lo que viene en el body. Repetirlo siempre deja exactamente el mismo libro.
- **PATCH** *no está garantizado* que sea idempotente: describe un cambio parcial, y ese cambio puede depender del estado actual (ej: `{ "op": "incrementar", "campo": "stock" }` suma 1 cada vez que se manda).

Aclaración: el `PATCH` de este `index.js` hace un merge con valores fijos (`{ "stock": 0 }`), así que en la práctica **sí** resulta idempotente. Pero la especificación HTTP no lo exige, por eso se dice que PATCH "no es idempotente" en general.
