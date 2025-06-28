import { Router } from "express";
import productRouter from "./product.route.js";
import userRouter from "./user.route.js";
const router = Router();

// Edpoint del Home.
router.get("/home", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

// Asignando los edpoints de las rutas de productos y usuarios.
router.use("/products", productRouter);
router.use("/users", userRouter);


export default router;