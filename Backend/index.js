const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const port = 9000;

const { Server } = require("socket.io");

const wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const timerr = async () => {
    try {
        await wait(2000);
        console.log("Waited for 2 seconds");

        const server = http.createServer(app);
        console.log("HTTP server created");

        const io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        console.log("Socket.io server created");

        io.on("connection", (socket) => {
            console.log("User connected", socket.id);

            socket.on("message", (data) => {
                console.log("Message received:", data);
                io.to(data.recipientId).emit("message", data);
            });

            socket.join(socket.id);

            socket.on("disconnect", () => {
                console.log("User disconnected", socket.id);
            });
        });

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error("Error in timerr function:", error);
    }
};

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

timerr();
