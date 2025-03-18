import { initSocketServer } from "./socketServer";
import { app } from "./app";
import connectDB from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
require("dotenv").config();

const server = http.createServer(app);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log("server is running");
  connectDB();
});
