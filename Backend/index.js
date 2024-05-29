const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRouter = require('./Routes/authRoutes');
const userRouter = require('./Routes/userRoutes');
const MESSAGE = require('./Model/Messages');
const app = express();
const server = http.createServer(app);
const PORT = 3001;

mongoose.connect('mongodb+srv://Chatify:Chatify%40123@chatify.7ck5jpe.mongodb.net/Chatify')
  .then(() => {
    console.log('Mongodb Connected');
  }).catch((err) => {
    console.log('mongodb not connected ', err);
  });

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', AuthRouter);
app.use('/api/users', userRouter);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log('User Connected', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User with ID: ${socket.id} joined room: ${roomId}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    const { roomId, content, sender_id,recipient_id} = data;
    setMessage(sender_id, roomId,content, recipient_id);
    io.to(roomId).emit('receive_message', { content, sender_id });
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

async function setMessage(senderId, roomId, content,recipient_id) {
  try {
  
    const msg = new MESSAGE({
      sender_id: senderId,
      recipient_id: recipient_id,
      content,
      roomId
    });

    await msg.save();
  } catch (error) {
    console.log(error);
  }
}



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
