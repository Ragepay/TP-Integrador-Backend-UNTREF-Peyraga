import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

//--------------------ENDPOINTS ADICIONALES-----------------------//
// Endpoint para buscar que contega parte del nombre.
router.get("/buscar", productController.getByNombre);

// Endpoint para buscar que contenga parte de la categoria.
router.get("/categoria/:nombre", productController.getByCategoria);

// Endpoint para buscar entre un rango de precios.
router.get("/precio/:min-:max", productController.getByPrecio);

// Endpoint para crear muchos productos a la vez.
router.post("/masivo", productController.postMasivo);

/* -------Hehco por mi-------- */
// Endpoint para subir un archivos.json con productos a la BBDD internamente del servidor utilizando fs.
router.post("/upload", productController.postUpload);
//--------------------ENDPOINTS ADICIONALES-----------------------//


//--------------------CRUD BASICO DE PRODUCTOS--------------------//
// Endpoint para ver todos los productos.
router.get("/", productController.getAll);

// Endpoint para ver un producto por su código.
router.get("/:codigo", productController.getByCodigo);

// Endpoints para crear, actualizar y eliminar productos.
router.post("/", productController.createProduct);

// Endpoint para actualizar un producto por su código.
router.put("/:codigo", productController.updateProduct);

// Endpoint para eliminar un producto por su código.
router.delete("/:codigo", productController.deleteProduct);
//--------------------CRUD BASICO DE PRODUCTOS--------------------//

export default router;