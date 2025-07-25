import jwt from "jsonwebtoken";

process.loadEnvFile();
const { SECRET_KEY } = process.env

// Crear un token con data. Dura 7 dias.
const createTokenUtil = (data) => {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 });
    return token; // Devuelve un token(string).
};

// Verifica un Token y devuelve la data codificada dentro de el.
const verifyTokenUtil = (token) => {
    const verifyData = jwt.verify(token, SECRET_KEY);
    return verifyData;
};

// Crear un token con data. Dura 1 segundo. Para el signout.
const finishTokenUtil = (data) => {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: 1 });
    return token; // Devuelve un token(string).
};

export { verifyTokenUtil, createTokenUtil, finishTokenUtil }

