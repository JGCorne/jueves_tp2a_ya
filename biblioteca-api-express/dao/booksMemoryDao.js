// DAO en memoria: el único lugar que sabe dónde y cómo se guardan los libros.
// Devuelve copias (no las referencias internas) para que nadie modifique el "almacenamiento" por afuera.
let books = [
  { id: 1, title: "El principito", author: "Saint-Exupéry", isbn: null, stock: 3 },
  { id: 2, title: "Cien años de soledad", author: "García Márquez", isbn: null, stock: 1 },
];
let nextId = 3;

const copy = (book) => (book ? { ...book } : null);

const booksMemoryDao = {
  async getAll() {
    return books.map(copy);
  },

  async getById(id) {
    return copy(books.find((book) => book.id === id));
  },

  async getByIsbn(isbn) {
    return copy(books.find((book) => book.isbn === isbn));
  },

  async save(book) {
    // Se descarta cualquier id que venga de afuera: el id lo asigna siempre el DAO,
    // si no un cliente podría elegir su propio id y pisar o duplicar uno existente.
    const { id: _ignored, ...data } = book;
    const newBook = { id: nextId++, ...data };
    books.push(newBook);
    return copy(newBook);
  },

  async update(id, changes) {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return null;
    const { id: _ignored, ...data } = changes;
    books[index] = { ...books[index], ...data };
    return copy(books[index]);
  },

  async delete(id) {
    const index = books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  },
};

export default booksMemoryDao;
