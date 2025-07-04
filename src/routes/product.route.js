import { Router } from "express";
import Product from "../models/product.model.js";
import { readFileSync } from "fs";
const router = Router();

//--------------------CRUD BASICO DE PRODUCTOS--------------------//
// Endpoint para ver todos los productos.
router.get("/", async (req, res) => {
    try {
        // Se obtienen todos los productos de la base de datos.
        const productos = await Product.find();
        // Mensaje y respuesta exitosa.
        const mensaje = "Productos encontrados correctamente.";
        res.status(200).json({ mensaje, productos });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return res.status(500).json({ error: "Error al obtener todos los productos." });
    }
});

// Endpoint para ver un producto por su código.
router.get("/:codigo", async (req, res) => {
    try {
        // Se obtiene el código del producto desde los parámetros de la solicitud.
        const { codigo } = req.params;
        // Se busca el producto en la base de datos por su código.
        const producto = await Product.findOne({ codigo: codigo });
        // Si el producto no existe, se devuelve un error.
        if (!producto) {
            return res.status(404).json({ error: "El producto no existe." });
        }
        // Mensaje y respuesta exitosa.
        const mensaje = "Producto encontrado correctamente.";
        res.status(200).json({ mensaje, producto });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return res.status(500).json({ error: "Error al obtener el producto por codigo." });
    }
});

// Endpoints para crear, actualizar y eliminar productos.
router.post("/", async (req, res) => {
    res.send("Product route is working!");
});

// Endpoint para actualizar un producto por su código.
router.put("/:codigo", async (req, res) => {
    res.send("Product route is working!");
});
//feat: POST crear product, PUT actualizar product y DELETE eliminar product.
// Endpoint para eliminar un producto por su código.
router.delete("/:codigo", async (req, res) => {
    res.send("Product route is working!");
});

// Endpoint para subir muchos productos por body a la BBDD.
router.post("/masivo", async (req, res) => {
    try {
        // Se verifica si el archivo existe y se lee su contenido.
        const productsComputacion = await JSON.parse(readFileSync("./src/data/computacion.json", "utf-8"));
        // Se inserta el contenido del archivo en la base de datos.
        await Product.insertMany(productsComputacion);
        // Mensaje y respuesta exitosa.
        res.status(201).json({ mensaje: "Productos subidos/creados correctamente." });
    } catch (error) {
        console.error("Error al subir los productos:", error);
        return res.status(500).json({ error: "Error al subir el archivo a la BBDD." });
    }
});
//--------------------CRUD BASICO DE PRODUCTOS--------------------//



//--------------------ENDPOINTS ADICIONALES-----------------------//
// Endpoint para buscar por query params.
router.get("/buscar", async (req, res) => {
    res.send("Product route is working!");
});

// Endpoint para buscar por categoria.
router.get("/categoria/:nombre", async (req, res) => {
    res.send("Product route is working!");
});

// Endpoint para buscar por query params.
router.get("/precio/:min-:max", async (req, res) => {
    res.send("Product route is working!");
});

// Endpoint para buscar por query params.
router.post("/masivo", async (req, res) => {
    res.send("Product route is working!");
});

/* -------Hehco por mi-------- */
// Endpoint para subir un archivo json con productos a la BBDD internamente del servidor.
router.post("/upload", async (req, res) => {
    try {
        // Se verifica si el archivo existe y se lee su contenido.
        const productsComputacion = await JSON.parse(readFileSync("./src/data/computacion.json", "utf-8"));
        // Se inserta el contenido del archivo en la base de datos.
        await Product.insertMany(productsComputacion);
        // Mensaje y respuesta exitosa.
        res.status(201).json({ mensaje: "Productos subidos/creados correctamente." });
    } catch (error) {
        console.error("Error al subir los productos:", error);
        return res.status(500).json({ error: "Error al subir el archivo a la BBDD." });
    }
});
//--------------------ENDPOINTS ADICIONALES-----------------------//

export default router;