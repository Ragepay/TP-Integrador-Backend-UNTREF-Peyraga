import express from "express";
import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import { dbConnect, dbDisconnect } from "./src/utils/database.js";

// Importar dotenv para leer variables de entorno.
process.loadEnvFile();
// Configuracion de variables de entorno.
const { PORT, MODE } = process.env;
// Inicializar el servidor.
const app = express();
// Escuchando el puerto.
app.listen(PORT, ready);

// Middlewares
app.disable("x-powered-by"); // Deshabilita la cabecera 'X-Powered-By' para evitar exponer que usamos Express (mejora la seguridad).
app.use(express.json()); // Parsea JSON del body
app.use(express.urlencoded({ extended: true })); // Parsea datos de formularios
app.use(morgan("dev")); // Logger para ver las peticiones en consola.

// Rutas
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

// Middleware de manejo de errores.
app.use(errorHandler);
app.use(pathHandler); // Debe ser el ultimo, porque recibe rutas no existentes.

// Funcion de ejecucion del servidor.
async function ready() {
    await dbConnect();
    console.log(`MODE: ${MODE} | PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
}

// Manejo de la señal SIGINT (Ctrl+C) para cerrar la conexion a la base de datos.
process.on("SIGINT", async () => {
    console.log("🔌 Desconectado de MongoDB. Adiós.");
    await dbDisconnect();
    process.exit(0);
});