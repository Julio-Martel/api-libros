const libros = require("../data/libros");

const obtenerTodosLosLibros = (req,res) => {
    res.json(libros);
}

const obtenerLibroPorAutor = (req,res) => {
    const resultados = [...libros];
    const autor = req.query.autor;

    if(autor){
        const librosFiltrados = resultados.filter(l => l.autor === autor);
        
        if(librosFiltrados.length !== 0) {
            res.json({
                mensaje: "Resultados de tu busqueda",
                librosFiltrados: librosFiltrados
            })
        } else {
            res.status(404).json({
                mensaje: "No hay resultados"
            })
        }
    
    }
}

module.exports = {
    obtenerTodosLosLibros,
    obtenerLibroPorAutor
}