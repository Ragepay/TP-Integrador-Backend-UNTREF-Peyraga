import mongoose from "mongoose";
// Cargar variables de entorno
process.loadEnvFile();
// Configuracion de variables de entorno.
const { MONGO } = process.env;

// Conectarse a la base de datos MongoDB.
async function dbConnect() {
    try {
        await mongoose.connect(MONGO);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null;
    }
}

// Desconectarse de la base de datos MongoDB.
async function dbDisconnect() {
    try {
        await mongoose.disconnect(MONGO);
        console.log("✅ Disconnected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null;
    }
}
// Exportar las funciones de conexión y desconexión.
export { dbConnect, dbDisconnect };