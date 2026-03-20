const express = require("express");
const app = express();

app.use(express.json());

const librosRoutes = require("./routes/libros.routes");

app.use("/libros", librosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});