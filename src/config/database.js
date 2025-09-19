import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/practica_mongodb");
    // await mongoose.connection.dropDatabase();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
  }
};