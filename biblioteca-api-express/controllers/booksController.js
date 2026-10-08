import AppError from "../errors/AppError.js";

// No importa ningún DAO ni caso de uso concreto: recibe los casos de uso ya armados por la factory.
// Los métodos son arrow functions para que `this` no se pierda al pasarlos como handlers al router.
class BooksController {
  #useCases;

  constructor(useCases) {
    this.#useCases = useCases;
  }

  #bookNotFound() {
    return new AppError("BOOK_NOT_FOUND", "No existe un libro con ese id", 404);
  }

  // GET /books — ?author=, ?sort=, ?page=, ?limit=
  list = async (req, res) => {
    const { author, sort } = req.query;
    const result = await this.#useCases.getBooks({ author, sort, ...req.pagination });
    res.status(200).json(result);
  };

  // GET /books/:id
  get = async (req, res) => {
    const book = await this.#useCases.getBookById(Number(req.params.id));
    if (!book) throw this.#bookNotFound();
    res.status(200).json(book);
  };

  // POST /books — req.body ya validado por validate(createBookSchema)
  create = async (req, res) => {
    const book = await this.#useCases.createBook(req.body);
    res.status(201).json(book);
  };

  // PUT /books/:id — req.body ya validado por validate(updateBookSchema)
  update = async (req, res) => {
    const book = await this.#useCases.updateBook(Number(req.params.id), req.body);
    if (!book) throw this.#bookNotFound();
    res.status(200).json(book);
  };

  // DELETE /books/:id
  remove = async (req, res) => {
    const deleted = await this.#useCases.deleteBook(Number(req.params.id));
    if (!deleted) throw this.#bookNotFound();
    res.status(204).end();
  };
}

export default BooksController;
