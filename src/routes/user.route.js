import { Router } from "express";
const router = Router();

// Endpoint para ver todos los usuarios.
router.get("/", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para ver un usuario por id.
router.get("/:id", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para registrar un nuevo usuario.
router.post("/register", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para loguear un usuario y almacenar el token en la cookie.
router.post("/login", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para cerrar sesion del usuario y eliminar la cookie.
router.post("/singout", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para actualizar un usuario por id.
router.put("/", (req, res) => {
    res.send("User route is working!");
});

// Endpoint para eliminar un usuario por id.
router.delete("/", (req, res) => {
    res.send("User route is working!");
});

export default router;