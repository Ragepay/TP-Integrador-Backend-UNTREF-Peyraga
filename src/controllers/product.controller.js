import Product from "../models/product.model.js";
import { readFileSync } from "fs";

//--------------------ENDPOINTS ADICIONALES-----------------------//
const getByNombre = async (req, res) => {
    try {
        // Obtencion del query.
        const { q } = req.query;
        // Validacion del query.
        if (!q || q.trim() === '') {
            return res.status(400).json({ mensaje: "Falta el parámetro de búsqueda 'q'." });
        }
        // Consulta de la existencia del producto.
        const productos = await Product.find({
            nombre: { $regex: q, $options: 'i' } // Búsqueda insensible a mayúsculas
        });
        // Respuesta si no existe tal producto.
        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron los productos." });
        }
        // Mensaje y respuesta exitosa.
        res.status(200).json({ mensaje: "Productos encontrados correctamente.", productos });
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
}

const getByCategoria = async (req, res) => {
    try {
        // Obtencion del parametro.
        const { nombre } = req.params;
        // Consulta de la existencia del producto.
        const productos = await Product.find({
            categoria: { $regex: nombre, $options: 'i' }
        });
        // Respuesta si no existe tal producto.
        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron los productos." });
        }
        // Mensaje y respuesta exitosa.
        res.status(200).json({ mensaje: "Productos encontrados correctamente.", productos });
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
}

const getByPrecio = async (req, res) => {
    try {
        // Obtencion del parametro.
        const { min, max } = req.params;
        // Validacion del max y min-
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ mensaje: "Parámetros inválidos de rango de precio." });
        }
        // Consulta de la existencia del producto.
        const productos = await Product.find({
            precio: { $lte: max, $gte: min }
        });
        // Respuesta si no existe tal producto.
        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron los productos." });
        }
        // Mensaje y respuesta exitosa.
        res.status(200).json({ mensaje: "Productos encontrados correctamente.", productos });
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
}

const postMasivo = async (req, res) => {
    try {
        // Se obtienen los datos de los nuevos productos
        const arrayProductos = req.body;
        let productosAgregados = [];
        let productosDefectuosos = [];
        // Validacion de cada propiedad de cada producto.
        for (const producto of arrayProductos) {
            const { codigo, nombre, precio, categoria } = producto;
            // Consulta de existencia del código
            const productoExistente = await Product.findOne({ codigo });
            // Validación completa
            if (
                productoExistente ||
                typeof codigo !== 'number' || isNaN(codigo) ||
                typeof nombre !== 'string' || nombre.trim() === '' ||
                typeof precio !== 'number' || isNaN(precio) ||
                !Array.isArray(categoria) || categoria.length === 0 ||
                !categoria.every(cat => typeof cat === 'string' && cat.trim() !== '')
            ) {
                // Pusheamos al array de productosDefectuosos.
                productosDefectuosos.push(producto);
            } else {
                // Creacion del producto en la base de datos.
                const productoNuevo = await Product.insertOne(producto);
                // Pusheamos al array de productosAgregados.
                productosAgregados.push(productoNuevo);
            }
        }
        // Mensaje y respuesta exitosa.
        res.status(201).json({ mensaje: "Productos creados correctamente. OBSERVAR SI HAY 'productosDefectuosos'.", productosAgregados, productosDefectuosos });
    } catch (error) {
        console.error("Error al crear los productos.", error);
        return res.status(500).json({ error: "Error al crear los productos." });
    }
}

const postUpload = async (req, res) => {
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
}
//--------------------ENDPOINTS ADICIONALES-----------------------//

//--------------------CRUD BASICO DE PRODUCTOS--------------------//
const getAll = async (req, res) => {
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
}

const getByCodigo = async (req, res) => {
    try {
        // Se obtiene el código del producto desde los parámetros de la solicitud.
        const { codigo } = req.params;
        // Se busca el producto en la base de datos por su código.
        const producto = await Product.findOne({ codigo: codigo });
        // Si el producto no existe, se devuelve un error.
        if (!producto) {
            return res.status(404).json({ mensaje: "El producto no existe." });
        }
        // Mensaje y respuesta exitosa.
        const mensaje = "Producto encontrado correctamente.";
        res.status(200).json({ mensaje, producto });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return res.status(500).json({ error: "Error al obtener el producto por codigo." });
    }
}

const createProduct = async (req, res) => {
    try {
        // Se obtienen los datos del nuevo producto.
        const { codigo, nombre, precio, categoria } = req.body;
        // Consulta de existencia del codigo de producto que es unico.
        const producto = await Product.findOne({ codigo: codigo })
        // Se validan que esten todos.
        if (producto ||
            typeof codigo !== 'number' || isNaN(codigo) ||
            typeof nombre !== 'string' || nombre.trim() === '' ||
            typeof precio !== 'number' || isNaN(precio) ||
            !Array.isArray(categoria) ||
            categoria.length === 0 ||
            !categoria.every(cat => typeof cat === 'string' && cat.trim() !== '')
        ) {
            return res.status(400).json({ mensaje: "Datos inválidos o codigo de producto ya existente." });
        }
        // Creacion del producto en la base de datos
        const productoNuevo = await Product.insertOne(req.body);
        // Mensaje y respuesta exitosa.
        res.status(201).json({ mensaje: "Producto creado correctamente.", productoNuevo });
    } catch (error) {
        console.error("Error al crear un producto.", error);
        return res.status(500).json({ error: "Error al crear un producto." });
    }
}

const updateProduct = async (req, res) => {
    try {
        // Se obtienen el id para buscar el producto.
        const id = req.params.codigo;
        const productoActualizado = await Product.findOneAndUpdate({ codigo: id }, req.body, { new: true });
        // Respuesta y mensaje por si no se encuentra el producto.
        if (productoActualizado == null) {
            return res.status(404).json({ mensaje: "Producto no existente o codigo invalido." })
        }
        // Mensaje y respuesta exitosa.
        res.status(200).json({ mensaje: "Producto actualizado correctamente.", productoActualizado });
    } catch (error) {
        console.error("Error al actualizar un producto.", error);
        return res.status(500).json({ error: "Error al actualizar un producto." });
    }
}

const deleteProduct = async (req, res) => {
    try {
        // Se obtienen el id para buscar el producto.
        const id = req.params.codigo;
        const productoEliminado = await Product.findOneAndDelete({ codigo: id }, { new: true });
        // Respuesta y mensaje por si no se encuentra el producto.
        if (productoEliminado == null) {
            return res.status(404).json({ mensaje: "Producto no existente o codigo invalido." })
        }
        // Mensaje y respuesta exitosa.
        res.status(200).json({ mensaje: "Producto eliminado correctamente.", productoEliminado });
    } catch (error) {
        console.error("Error al eliminar un producto.", error);
        return res.status(500).json({ error: "Error al eliminar un producto." });
    }
}

//--------------------CRUD BASICO DE PRODUCTOS--------------------//
const productController = {
    getByNombre, getByCategoria, getByPrecio,
    postMasivo, postUpload, getAll, getByCodigo,
    createProduct, updateProduct, deleteProduct
}
export default productController;