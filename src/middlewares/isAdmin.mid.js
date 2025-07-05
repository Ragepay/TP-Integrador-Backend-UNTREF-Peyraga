import { verifyTokenUtil } from "../utils/token.util.js";

const isAdmin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        const data = verifyTokenUtil(token);
         console.log(data)
        if (token || data.role === "ADMIN") {
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