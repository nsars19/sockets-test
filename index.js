const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/user-leaving", (req, res) => {
  id.on("connection", () => {
    io.emit("user disconnect", { id: req.query.id, name: req.query.name });
  });

  res.send(200);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("user connect", { id: socket.id });

  socket.on("chat message", ({ msg, name }) => {
    console.log("message: " + msg, " name: " + name);
    io.emit("chat message", { msg, name });
  });

  socket.on("keydown", (username) => {
    console.log("keydown by: " + username);
    io.emit("keydown", username);
  });

  socket.on("keyup", (username) => {
    console.log("keyup by: " + username);
    io.emit("keyup", username);
  });

  socket.on("mousemove", ({ id, name, x, y }) => {
    io.emit("mousemove", { id, name, x, y });
  });

  socket.on("user disconnect", ({ id, name }) => {
    console.log("user disconnected: ", id, name);
    io.emit("user disconnect", { id });
  });
});

server.listen(process.env.PORT || 3002, () => {
  console.log("listening on *:" + (process.env.PORT ?? 3002));
});
