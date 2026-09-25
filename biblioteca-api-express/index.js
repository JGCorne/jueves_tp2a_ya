import express from "express";

const app = express();
const PUERTO = 3000;

app.use(express.json());

let libros = [
  { id: 1, isbn: "9780307474728", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", stock: 3 },
  { id: 2, isbn: "9780345391803", titulo: "Guía del autoestopista galáctico", autor: "Douglas Adams", stock: 0 },
  { id: 3, isbn: "9780140449136", titulo: "La Odisea", autor: "Homero", stock: 5 },
  { id: 4, isbn: "9780061120084", titulo: "Matar a un ruiseñor", autor: "Harper Lee", stock: 2 },
  { id: 5, isbn: "9780452284234", titulo: "1984", autor: "George Orwell", stock: 1 },
];

const buscarLibro = (id) => libros.find((libro) => libro.id === Number(id));

app.get("/libros", (req, res) => {
  const { autor } = req.query;
  if (autor) {
    const filtrados = libros.filter((libro) =>
      libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
    return res.status(200).json(filtrados);
  }
  res.status(200).json(libros);
});

app.get("/libros/:id", (req, res) => {
  const libro = buscarLibro(req.params.id);
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  res.status(200).json(libro);
});

app.post("/libros", (req, res) => {
  const { titulo, autor } = req.body ?? {};
  if (!titulo || !autor) {
    return res.status(400).json({ error: "El título y el autor son obligatorios" });
  }
  const id = libros.length === 0 ? 1 : Math.max(...libros.map((l) => l.id)) + 1;
  const nuevo = { ...req.body, id };
  libros.push(nuevo);
  res.status(201).json(nuevo);
});

app.put("/libros/:id", (req, res) => {
  const indice = libros.findIndex((libro) => libro.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  // PUT reemplaza el recurso entero: lo que no venga en el body se pierde (salvo el id)
  const actualizado = { ...req.body, id: libros[indice].id };
  libros[indice] = actualizado;
  res.status(200).json(actualizado);
});

// Desafío opcional: PATCH actualiza solo los campos enviados
app.patch("/libros/:id", (req, res) => {
  const indice = libros.findIndex((libro) => libro.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  const actualizado = { ...libros[indice], ...req.body, id: libros[indice].id };
  libros[indice] = actualizado;
  res.status(200).json(actualizado);
});

app.delete("/libros/:id", (req, res) => {
  const libro = buscarLibro(req.params.id);
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  libros = libros.filter((l) => l.id !== libro.id);
  res.status(200).json({ mensaje: "Libro eliminado correctamente" });
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
