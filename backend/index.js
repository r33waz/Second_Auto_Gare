import express from "express";
import "dotenv/config";
import cors from "cors";
import mainRouter from "./src/routes/main.js";
import { Dbconnect } from "./src/config/dbconfig.js";
import session from "express-session";

const app = express();
Dbconnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
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
// Example route to generate and retrieve session ID and token
app.get('/generate-session', (req, res) => {
  // Generate a session ID
  const sessionId = req.sessionID;

  // Generate a session token (optional)
  const sessionToken = generateSessionToken();

  res.json({
    sessionId,
    sessionToken,
  });
});

// Helper function to generate a session token (you can customize this)
function generateSessionToken() {
  const tokenLength = 32; // Adjust the length as needed
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

const PORT = process.env.PORT;
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
