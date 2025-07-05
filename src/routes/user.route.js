import { Router } from "express";
import userController from "../controllers/user.controller.js";
const router = Router();

// Endpoint para ver todos los usuarios.
router.get("/", userController.getAllUsers);

// Endpoint para ver un usuario por id.
router.get("/:id", userController.getUserbyId);

// Endpoint para registrar un nuevo usuario.
router.post("/register", userController.registerUser);

// Endpoint para loguear un usuario y almacenar el token en la cookie.
router.post("/login", userController.loginUser);

// Endpoint para cerrar sesion del usuario y eliminar la cookie.
router.post("/signout", userController.signoutUser);

// Endpoint para actualizar un usuario por id.
router.put("/:id", userController.updateUser);

// Endpoint para eliminar un usuario por id.
router.delete("/:id", userController.deleteUser);

export default router;