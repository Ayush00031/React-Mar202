import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

import socketHandler from "./sockets/socket.js";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();
const server = createServer(app);

app.use(json({ limit: "5mb" }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

socketHandler(server);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
