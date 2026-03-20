const express = require("express");
const router = express.Router();

const librosController = require("../controllers/libros.controller");

router.get("/", librosController.obtenerLibroPorAutor);
router.delete("/:codigo", librosController.eliminarLibro);
router.patch("/:codigo", librosController.modificarLibro);
router.put("/:codigo", librosController.reemplazarLibro);

router.get("/", (req,res) => {
    console.log("ENTRO A LIBROS");
    res.json({mensaje: "ok"});
});

module.exports = router;