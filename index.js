const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", ({ msg, name }) => {
    console.log("message: " + msg, " name: " + name);
    io.emit("chat message", `${name}: ${msg}`);
  });

  socket.on("keydown", (username) => {
    console.log("keydown by: " + username);
    io.emit("keydown", username);
  });

  socket.on("keyup", (username) => {
    console.log("keyup by: " + username);
    io.emit("keyup", username);
  });
});

server.listen(3002, () => {
  console.log("listening on *:3002");
});
