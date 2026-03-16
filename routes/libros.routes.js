const express = require("express");
const router = express.Router();

const librosController = require("../controllers/libros.controller");

router.get("/", librosController.obtenerTodosLosLibros);
router.get("/:autor", librosController.obtenerLibroPorAutor);
//router.get("/paginas/:cantidad", librosController.librosPorPaginas);

module.exports = router;