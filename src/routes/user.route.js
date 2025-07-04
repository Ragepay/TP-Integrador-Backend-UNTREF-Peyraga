import { Router } from "express";
import User from "../models/user.model.js";
const router = Router();

// Endpoint para ver todos los usuarios.
router.get("/", async (req, res) => {
    try {
        // Se obtienen todos los Usuarios de la base de datos.
        const usuarios = await User.find();
        // Mensaje y respuesta exitosa.
        const mensaje = "Usuarios encontrados correctamente.";
        res.status(200).json({ mensaje, usuarios });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return res.status(500).json({ error: "Error al obtener todos los usuarios." });
    }
});

// Endpoint para ver un usuario por id.
router.get("/:id", async (req, res) => {
    try {
        // Se obtiene el código del usuario desde los parámetros de la solicitud.
        const { id } = req.params;
        // Se busca el usuario en la base de datos por su código.
        const usuario = await User.findById(id);
        // Si el usuario no existe, se devuelve un error.
        if (!usuario) {
            return res.status(404).json({ error: "El usuario no existe." });
        }
        // Mensaje y respuesta exitosa.
        const mensaje = "Usuario encontrado correctamente.";
        res.status(200).json({ mensaje, usuario });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).json({ error: "Error al obtener el usuario por id." });
    }
});

// Endpoint para registrar un nuevo usuario.
router.post("/register", async (req, res) => {
    try {
        // Se obtienen los datos del nuevo usuario.
        const { email, password, name } = req.body;
        // Consulta de existencia del email del usuario que es unico.
        const usuario = await User.findOne({ email: email });
        // Se validan que esten todos.
        if (usuario || !email || !password || !name) {
            return res.status(400).json({ mensaje: "Datos inválidos o email existente." });
        }
        // Creacion del usuario en la base de datos
        const usuarioNuevo = await User.insertOne(req.body);
        // Mensaje y respuesta exitosa.
        res.status(201).json({ mensaje: "Usuario creado correctamente.", usuarioNuevo });
    } catch (error) {
        console.error("Error al crear un usuario.", error);
        return res.status(500).json({ error: "Error al crear un usuario." });
    }
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