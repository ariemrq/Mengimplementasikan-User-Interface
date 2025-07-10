import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { db } from "./models/db.js";

dotenv.config();

var corsOptions = {
  origin: process.env.CORS_ALLOW_LIST,
  optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", userRoutes);

db.connect(err => {
  if (err) throw err;
  console.log("Connected to DB");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
