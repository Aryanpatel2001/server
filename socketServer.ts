import { Server as SoketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SoketIOServer(server);

  io.on("connection", (socket: any) => {
    console.log("A user connected");

    socket.on("notification", (data: any) => {
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
