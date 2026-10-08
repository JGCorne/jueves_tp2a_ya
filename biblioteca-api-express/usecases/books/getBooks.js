// filters: { author?, sort?, page, limit } — page y limit ya vienen validados por Zod
async function getBooks(filters, dao) {
  const { author, sort, page = 1, limit = 20 } = filters;

  let books = await dao.getAll();

  if (author) {
    const term = author.toLowerCase();
    books = books.filter((book) => book.author.toLowerCase().includes(term));
  }

  if (sort) {
    const desc = sort.startsWith("-");
    const field = desc ? sort.slice(1) : sort;
    books.sort((a, b) => {
      if (a[field] < b[field]) return desc ? 1 : -1;
      if (a[field] > b[field]) return desc ? -1 : 1;
      return 0;
    });
  }

  const total = books.length;
  const from = (page - 1) * limit;
  return { page, limit, total, data: books.slice(from, from + limit) };
}

export default getBooks;
