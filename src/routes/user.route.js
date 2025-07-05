import { Router } from "express";
import userController from "../controllers/user.controller.js";
import isAdmin from "../middlewares/isAdmin.mid.js";
const router = Router();

// Endpoint para ver todos los usuarios. 
// ----- RUTA PRIVADA -----
router.get("/", isAdmin, userController.getAllUsers);

// Endpoint para ver un usuario por id. 
// ----- RUTA PRIVADA -----
router.get("/:id", isAdmin, userController.getUserbyId);

// Endpoint para registrar un nuevo usuario.
router.post("/register", userController.registerUser);

// Endpoint para loguear un usuario y almacenar el token en la cookie.
router.post("/login", userController.loginUser);

// Endpoint para cerrar sesion del usuario y eliminar la cookie.
router.post("/signout", userController.signoutUser);

// Endpoint para actualizar un usuario por id. 
// ----- RUTA PRIVADA -----
router.put("/:id", isAdmin, userController.updateUser);

// Endpoint para eliminar un usuario por id. 
// ----- RUTA PRIVADA -----
router.delete("/:id", isAdmin, userController.deleteUser);

export default router;