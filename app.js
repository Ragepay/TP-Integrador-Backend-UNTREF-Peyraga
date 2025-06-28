import express from "express";
import morgan from "morgan";

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

// RUTA DE EJEMPLO
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

// Funcion de ejecucion del servidor.
async function ready() {
    console.log(`MODE: ${MODE} | PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
}
