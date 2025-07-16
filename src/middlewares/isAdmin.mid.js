import { verifyTokenUtil } from "../utils/token.util.js";

const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ mensaje: "Token no proporcionado." });
    }
    const data = verifyTokenUtil(token);
    if (data.role === "ADMIN") {
      return next();
    } else {
      return res.status(403).json({ mensaje: "Usted no está autorizado, solo ADMIN." });
    }
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    return res.status(401).json({ mensaje: "Token inválido o expirado." });
  }
};

export default isAdmin;
