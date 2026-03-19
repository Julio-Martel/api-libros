const libros = require("../data/libros");

const obtenerTodosLosLibros = (req,res) => {
    res.json(libros);
}

const obtenerLibroPorAutor = (req,res) => {
    let resultados = [...libros];
    const { autor } = req.query;

    if (autor) {
        resultados = resultados.filter(l =>
            l.autor.toLowerCase().includes(autor.toLowerCase())
        );

        if (resultados.length !== 0) {
            return res.json({
                mensaje: "Resultados de tu búsqueda",
                resultados
            });
        } else {
            return res.status(404).json({
                mensaje: "No hay resultados"
            });
        }
    }

    // 👇 IMPORTANTE: si no hay autor
    return res.json(resultados);
}
module.exports = {
    obtenerTodosLosLibros,
    obtenerLibroPorAutor
}