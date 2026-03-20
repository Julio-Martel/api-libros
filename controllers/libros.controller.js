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

    return res.json(resultados);
}


const eliminarLibro = (req,res) => {

    const  codigo = parseInt(req.params.codigo);
    const libroEncontrado = libros.findIndex(l => l.codigo === codigo);

    
    if (isNaN(codigo)) {
        return res.status(400).json({
            mensaje: "Código inválido"
        });
    } else {
        if(libroEncontrado !== -1 ){
            console.log(libroEncontrado)
            libros.splice(libroEncontrado, 1);

            let j = 1;
            libros.forEach(libro => {
                libro.codigo = j;
                j++;
            })

            return res.status(202).json({
                mensaje:"Listado de libros actualizada",
                libros
            })
      
        } else {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            })
        }

    }

    
}

module.exports = {
    obtenerTodosLosLibros,
    obtenerLibroPorAutor,
    eliminarLibro
}