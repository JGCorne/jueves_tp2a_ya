import { libros } from "../data/libros.js";

const errorLibroNoEncontrado = (res, id) =>
  res.status(404).json({
    error: { code: "LIBRO_NO_ENCONTRADO", message: `No existe el libro con id ${id}` },
  });

const buscarIndice = (id) => libros.findIndex((libro) => libro.id === Number(id));

export function listar(req, res) {
  const { autor, sort } = req.query;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 20, 1);

  let resultado = [...libros];

  if (autor) {
    resultado = resultado.filter((libro) =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
  }

  if (sort) {
    const descendente = sort.startsWith("-");
    const campo = descendente ? sort.slice(1) : sort;
    resultado.sort((a, b) => {
      if (a[campo] < b[campo]) return descendente ? 1 : -1;
      if (a[campo] > b[campo]) return descendente ? -1 : 1;
      return 0;
    });
  }

  const total = resultado.length;
  const inicio = (page - 1) * limit;
  const data = resultado.slice(inicio, inicio + limit);

  res.status(200).json({ page, limit, total, data });
}

export function obtener(req, res) {
  const indice = buscarIndice(req.params.id);
  if (indice === -1) return errorLibroNoEncontrado(res, req.params.id);
  res.status(200).json(libros[indice]);
}

export function crear(req, res) {
  const { titulo, autor } = req.body ?? {};
  if (!titulo || !autor) {
    return res.status(400).json({
      error: { code: "DATOS_INCOMPLETOS", message: "El título y el autor son obligatorios" },
    });
  }
  const id = libros.length === 0 ? 1 : Math.max(...libros.map((l) => l.id)) + 1;
  const nuevo = { ...req.body, id };
  libros.push(nuevo);
  res.status(201).json(nuevo);
}

export function actualizar(req, res) {
  const indice = buscarIndice(req.params.id);
  if (indice === -1) return errorLibroNoEncontrado(res, req.params.id);
  const actualizado = { ...req.body, id: libros[indice].id };
  libros[indice] = actualizado;
  res.status(200).json(actualizado);
}

export function eliminar(req, res) {
  const indice = buscarIndice(req.params.id);
  if (indice === -1) return errorLibroNoEncontrado(res, req.params.id);
  libros.splice(indice, 1);
  res.status(200).json({ mensaje: "Libro eliminado correctamente" });
}
