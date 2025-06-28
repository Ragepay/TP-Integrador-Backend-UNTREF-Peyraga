import mongoose from "mongoose";
process.loadEnvFile();
const { MONGO } = process.env;


async function dbConnect() {
    try {
        await mongoose.connect(MONGO);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null;
    }
}

async function dbDisconnect() {
    try {
        await mongoose.disconnect(MONGO);
        console.log("✅ Disconnected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null;
    }
}

export { dbConnect, dbDisconnect };