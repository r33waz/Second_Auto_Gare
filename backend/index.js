import express from "express";
import "dotenv/config";
import cors from "cors";
import mainRouter from "./src/routes/main.js";
import { Dbconnect } from "./src/config/dbconfig.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
Dbconnect()

const PORT = process.env.PORT;
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at${PORT}`);
});
