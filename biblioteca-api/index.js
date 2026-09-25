const {
  listarLibros,
  buscarPorId,
  buscarPorAutor,
  contarConStock,
  agregarLibro,
} = require("./libroService");

async function main() {
  try {
    console.log("Cantidad de libros:", (await listarLibros()).length);
    console.log("Libro id 3:", await buscarPorId(3));
    console.log("De Orwell:", await buscarPorAutor("orwell"));
    console.log("Con stock:", await contarConStock());

    const nuevo = await agregarLibro({
      isbn: "9788437604947",
      titulo: "Rayuela",
      autor: "Julio Cortázar",
      stock: 4,
    });
    console.log("Agregado:", nuevo);

    // Cada corrida suma un libro más: persiste en data/libros.json
    console.log("Cantidad de libros ahora:", (await listarLibros()).length);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
