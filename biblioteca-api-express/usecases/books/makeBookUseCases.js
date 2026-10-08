import getBooks from "./getBooks.js";
import getBookById from "./getBookById.js";
import createBook from "./createBook.js";
import updateBook from "./updateBook.js";
import deleteBook from "./deleteBook.js";

// Desafío 1: decorador que loguea qué caso de uso se ejecuta, sin tocar los casos de uso
const withLog = (name, fn) => (...args) => {
  console.log(`[UseCase] Executing ${name}...`);
  return fn(...args);
};

// Factory: recibe el DAO una sola vez y devuelve los casos de uso ya conectados a él (closures)
function makeBookUseCases(dao) {
  return {
    getBooks: withLog("getBooks", (filters) => getBooks(filters, dao)),
    getBookById: withLog("getBookById", (id) => getBookById(id, dao)),
    createBook: withLog("createBook", (data) => createBook(data, dao)),
    updateBook: withLog("updateBook", (id, changes) => updateBook(id, changes, dao)),
    deleteBook: withLog("deleteBook", (id) => deleteBook(id, dao)),
  };
}

export default makeBookUseCases;
