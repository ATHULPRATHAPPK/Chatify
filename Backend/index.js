const express = require("express");
const http = require("http");

const cors = require("cors")
const app = express();
const port = 9000;

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use(cors(
    {
        origin: "https://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true
    }
))

io.on("connection", (socket) => {
    console.log("user connected");
    console.log("id", socket.id);
    console.log("user connected");
    console.log("id", socket.id);
    

});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
