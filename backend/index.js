import express from "express";
import "dotenv/config";
import cors from "cors";
import mainRouter from "./src/routes/main.js";
import { Dbconnect } from "./src/config/dbconfig.js";
import cookieParser from "cookie-parser";

const app = express();
Dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT;
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
