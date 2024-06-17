import express from "express";

import cors from "cors";

import mainRouter from "./routes/main.js";

import { Dbconnect } from "./config/dbconfig.js";

import cookieParser from "cookie-parser"

import { Server } from "socket.io";
import { createServer } from "http";
import User from "./models/user.model.js";
import "dotenv/config.js";

const app = express();
Dbconnect();

// Use the same server instance for both Express and Socket.IO
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin:"https://second-auto-gare.vercel.app/",
    credentials: true,
  })
);

app.use(cookieParser());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true,
  },
});
// Socket Connection
let users = [];
console.log("user", users);
io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on("addUser", (userId) => {
    const existingUser = users.find((i) => i?.userId === userId);
    if (!existingUser) {
      const user = { userId, socketId: socket?.id };
      users.push(user);
      io.emit("getOnlineUser", users);
    }
  });
  socket.on(
    "sendMessage",
    async ({ senderId, recieverId, message, conversationId }) => {
      console.log(senderId, recieverId, message, conversationId);
      const reciver = users.find((user) => user?.userId === recieverId);
      const sender = users.find((user) => user?.userId === senderId);
      console.log("recevir sender", reciver, sender);
      const user = await User.findById(senderId);
      if (reciver) {
        io.to(reciver?.socketId).to(sender?.socketId).emit("getMessage", {
          senderId,
          message,
          recieverId,
          conversationId,
          user: user,
        });
      }
    }
  );
  socket.on("disconnect", () => {
    users = users.filter((i) => i?.socketId !== socket?.id);
    io.emit("getOnlineUser", users);
  });
});

app.use(mainRouter);

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
server.listen(SOCKET_PORT, () => {
  console.log(`Socket is running at ${SOCKET_PORT}`);
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
