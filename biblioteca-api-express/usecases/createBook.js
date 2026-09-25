import AppError from "../errors/AppError.js";

// data ya viene validado por Zod: { title, author, isbn?, stock }
async function createBook(data, dao) {
  if (data.isbn) {
    const existing = await dao.getByIsbn(data.isbn);
    if (existing) {
      throw new AppError("ISBN_DUPLICATE", "Ese ISBN ya está registrado", 409);
    }
  }
  return dao.save({ isbn: null, ...data });
}

export default createBook;
