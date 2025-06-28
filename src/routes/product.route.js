import { Router } from "express";
const router = Router();

// Endpoint para ver todos los productos.
router.get("/", (req, res) => {
    res.send("Product route is working!");
});

export default router;