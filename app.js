import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDB } from './src/config/database.js';
import userModel from './src/models/user.model.js';
import commentModel from './src/models/comment.model.js';
import tagModel from './src/models/tag.model.js';
import articleModel from './src/models/article.model.js'
import cookieParser from 'cookie-parser';
import { routes } from './src/routes/index.js';


const app = express();
const PORT = process.env.PORT;

//middlw
app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api", routes)

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});