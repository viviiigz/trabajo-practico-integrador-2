import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDB } from './src/config/database.js';
import userModel from './src/models/user.model.js';


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});