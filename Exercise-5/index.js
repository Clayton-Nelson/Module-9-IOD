const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  io.emit("connection", "Server: a user connected");
  socket.on("disconnect", () => {
    io.emit("connection", "Server: user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    socket.broadcast.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
