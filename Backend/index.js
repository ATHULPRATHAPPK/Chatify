const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const cors = require('cors');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log('user Connected', socket.id);

  socket.on('send_message', (data) => {
    const { recipientId, content } = data;
    socket.broadcast.emit('receive_message', { content, senderId:'User' });
  });

  socket.on('disconnect', () => {
    console.log('user Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log("server is running on port 3001");
});
