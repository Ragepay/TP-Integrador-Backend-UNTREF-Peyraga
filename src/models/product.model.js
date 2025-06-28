import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        codigo: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        categoria: {
            type: [String],
            enum: [
                "Monitores",
                "Computación",
                "Desktop",
                "Portátiles",
                "Accesorios",
                "Impresoras",
                "Partes de computadoras"
            ],
            default: "Computación"
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

export default Product;
