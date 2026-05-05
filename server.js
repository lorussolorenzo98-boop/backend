import express from "express";
import dotenv from "dotenv";
import {connect} from "./db.js";
import cors from "cors";

dotenv.config();
connect();

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Mastro API funziona' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`)
})