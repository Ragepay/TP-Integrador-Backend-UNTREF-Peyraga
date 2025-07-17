import { verifyTokenUtil } from "../utils/token.util.js";

const isAdmin = (req, res, next) => {
  try {
    // Obtener el token de las cookies.
    const token = req.cookies.token;
    // Verificar si existe el token.
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado." });
    }
    // Verificar el token y obtener los datos del usuario.
    const data = verifyTokenUtil(token);
    // Verificar si el usuario es ADMIN
    if (data.role === "ADMIN") {
      // Pasa al siguiente middleware.
      return next();
    } else {
      // Respuesta si el usuario no es ADMIN.
      return res.status(403).json({ mensaje: "Usted no está autorizado, solo ADMIN." });
    }
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};

export default isAdmin;
