import dao from "../dao/booksMemoryDao.js";
import AppError from "../errors/AppError.js";
import getBooks from "../usecases/getBooks.js";
import getBookById from "../usecases/getBookById.js";
import createBook from "../usecases/createBook.js";
import updateBook from "../usecases/updateBook.js";
import deleteBook from "../usecases/deleteBook.js";

// El controller solo traduce HTTP <-> casos de uso. Express 5 atrapa los rechazos de los handlers async.

const bookNotFound = () => new AppError("BOOK_NOT_FOUND", "No existe un libro con ese id", 404);

// GET /books — filtro (?author=), orden (?sort=) y paginación (?page=&limit=) son de presentación
export async function list(req, res) {
  const { author, sort } = req.query;
  const { page, limit } = req.pagination;

  let result = await getBooks(dao);

  if (author) {
    const term = author.toLowerCase();
    result = result.filter((book) => book.author.toLowerCase().includes(term));
  }

  if (sort) {
    const desc = sort.startsWith("-");
    const field = desc ? sort.slice(1) : sort;
    result.sort((a, b) => {
      if (a[field] < b[field]) return desc ? 1 : -1;
      if (a[field] > b[field]) return desc ? -1 : 1;
      return 0;
    });
  }

  const total = result.length;
  const from = (page - 1) * limit;
  res.status(200).json({ page, limit, total, data: result.slice(from, from + limit) });
}

// GET /books/:id
export async function get(req, res) {
  const book = await getBookById(Number(req.params.id), dao);
  if (!book) throw bookNotFound();
  res.status(200).json(book);
}

// POST /books — req.body ya validado por validate(createBookSchema)
export async function create(req, res) {
  const book = await createBook(req.body, dao);
  res.status(201).json(book);
}

// PUT /books/:id — req.body ya validado por validate(updateBookSchema)
export async function update(req, res) {
  const book = await updateBook(Number(req.params.id), req.body, dao);
  if (!book) throw bookNotFound();
  res.status(200).json(book);
}

// DELETE /books/:id — 204: se borró y no hay nada que devolver
export async function remove(req, res) {
  const deleted = await deleteBook(Number(req.params.id), dao);
  if (!deleted) throw bookNotFound();
  res.status(204).end();
}
