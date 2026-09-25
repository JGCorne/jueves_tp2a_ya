// Devuelve el libro o null: decidir si null es un 404 es una decisión HTTP (del controller).
async function getBookById(id, dao) {
  return dao.getById(id);
}

export default getBookById;
