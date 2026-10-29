const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io basic Connection
io.on("connection", (socket) => {
    console.log("A new user has connected:", socket.id);

    socket.on("user-message", (message) => {
        console.log("User:", message);
        io.emit("server-message", message)
    })
})

const PORT = 5000;
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile("/public/index.html");
})

server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
})