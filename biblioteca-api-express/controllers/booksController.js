import books from "../data/books.js";
import AppError from "../errors/AppError.js";

const bookNotFound = (id) => new AppError("BOOK_NOT_FOUND", `No book exists with id ${id}`, 404);

const findIndex = (id) => books.findIndex((book) => book.id === Number(id));

// GET /books — filtro (?author=), orden (?sort=) y paginación (?page=&limit=, validados)
export function list(req, res, next) {
  const { author, sort } = req.query;
  const { page, limit } = req.pagination;

  let result = [...books];

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
  const data = result.slice(from, from + limit);

  res.status(200).json({ page, limit, total, data });
}

// GET /books/:id
export function get(req, res, next) {
  const index = findIndex(req.params.id);
  if (index === -1) return next(bookNotFound(req.params.id));
  res.status(200).json(books[index]);
}

// POST /books — req.body ya viene validado por validate(createBookSchema)
export function create(req, res, next) {
  const { isbn } = req.body;

  if (isbn && books.some((book) => book.isbn === isbn)) {
    return next(new AppError("ISBN_DUPLICATE", `A book with ISBN ${isbn} already exists`, 409));
  }

  const id = books.length === 0 ? 1 : Math.max(...books.map((book) => book.id)) + 1;
  const newBook = { id, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
}

// PUT /books/:id — req.body ya viene validado por validate(updateBookSchema)
export function update(req, res, next) {
  const index = findIndex(req.params.id);
  if (index === -1) return next(bookNotFound(req.params.id));

  const { isbn } = req.body;
  if (isbn && books.some((book) => book.isbn === isbn && book.id !== books[index].id)) {
    return next(new AppError("ISBN_DUPLICATE", `A book with ISBN ${isbn} already exists`, 409));
  }

  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.status(200).json(books[index]);
}

// DELETE /books/:id
export function remove(req, res, next) {
  const index = findIndex(req.params.id);
  if (index === -1) return next(bookNotFound(req.params.id));
  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
}
