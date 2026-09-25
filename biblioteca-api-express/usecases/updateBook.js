import AppError from "../errors/AppError.js";

async function updateBook(id, changes, dao) {
  // Desafío 1: regla de negocio. Zod ya rechaza stock negativo en la ruta HTTP, pero el caso
  // de uso no depende de quién lo llame (otra ruta, un script, un test) y protege la regla igual.
  if (changes.stock !== undefined && changes.stock < 0) {
    throw new AppError("INVALID_STOCK", "El stock no puede ser negativo", 400);
  }

  if (changes.isbn) {
    const existing = await dao.getByIsbn(changes.isbn);
    if (existing && existing.id !== id) {
      throw new AppError("ISBN_DUPLICATE", "Ese ISBN ya está registrado", 409);
    }
  }

  return dao.update(id, changes);
}

export default updateBook;
