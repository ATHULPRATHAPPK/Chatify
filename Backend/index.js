const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/authRoutes');

const app = express();
const server = http.createServer(app);
const PORT = 3001;

mongoose.connect('mongodb+srv://Chatify:Chatify%40123@chatify.7ck5jpe.mongodb.net/Chatify').then(()=>{
  console.log('Mongodb Connected');
}).catch(()=>{
  console.log('mongodb not connected ');
})

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
