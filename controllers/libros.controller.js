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

    if (isNaN(codigo)) {
        return res.status(400).json({
            mensaje: "Código inválido"
        });
    } else {
        const libroEncontrado = libros.findIndex(l => l.codigo === codigo);

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

const modificarLibro = (req,res) => {
    const codigo = parseInt(req.params.codigo);

    if(isNaN(codigo)){
        return res.status(400).json({
            mensaje: "Codigo invalido"
        })
    } else {
        const libroEncontrado = libros.findIndex(l => l.codigo === codigo);
        console.log(codigo)
        if(libroEncontrado !== -1){

            libros[libroEncontrado] = {
                codigo: codigo,
                ...libros[libroEncontrado],
                ...req.body
            }
        
            res.status(200).json({
                mensaje: "Libro Actualizado",
                libros
            })
        } else {
            res.status(404).json({
                mensaje: "Libro no encontrado"
            })
        }
    }
}

const reemplazarLibro = (req,res) => {
    const codigo = parseInt(req.params.codigo);

    if(isNaN(codigo)){
        return res.status(400).json({
            mensaje: "Codigo invalido"
        })
    } else {
        const libroEncontrado = libros.findIndex(l => l.codigo === codigo); 
        
        if(libroEncontrado !== -1){
            const libroActualizado = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                año: parseInt(req.body.año),
                pais: req.body.pais,
                paginas: parseInt(req.body.paginas)
            }

            libros[libroEncontrado] = {
                codigo: codigo,
                ...libroActualizado
            }

            return res.status(200).json({
                mensaje: "Libro reemplazado"
            })

        } else {
            return res.status(404).json({
                mensaje: "Libro no encontrado"
            })            
        }
    }   
}

const crearNuevoLibro = (req,res) => {
    const nuevoLibro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        año: req.body.año,
        pais: req.body.pais,
        paginas: req.body. paginas
    }

    const libroRepetido = libros.findIndex(l => l.titulo === nuevoLibro.titulo);

    console.log(libroRepetido)

    if(libroRepetido !== -1){
        return res.status(400).json({
            mensaje: "Libro con titulo repetido"
        })
    } else {
        libros.push(nuevoLibro);
        return res.status(200).json({
            mensaje: "Libro nuevo agregado"
        })

    }
}

module.exports = {
    obtenerTodosLosLibros,
    obtenerLibroPorAutor,
    crearNuevoLibro,
    modificarLibro,
    reemplazarLibro,
    eliminarLibro
}