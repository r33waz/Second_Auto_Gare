import express from "express";
import "dotenv/config";
import cors from "cors";
import mainRouter from "./src/routes/main.js";
import { Dbconnect } from "./src/config/dbconfig.js";
import session from "express-session";
import http from "https"

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
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      //*Here keeping secure false beacuse we are thestng it in our local device
      //* In the production we will change false in true to make it secure
      secure: false,
      sameSite: "Lax",
    },
  })
);

const PORT = process.env.PORT;
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
