import { autores } from "../data/autores.js";

export function listar(req, res) {
  res.status(200).json(autores);
}

export function obtener(req, res) {
  const autor = autores.find((a) => a.id === Number(req.params.id));
  if (!autor) {
    return res.status(404).json({
      error: { code: "AUTOR_NO_ENCONTRADO", message: `No existe el autor con id ${req.params.id}` },
    });
  }
  res.status(200).json(autor);
}
