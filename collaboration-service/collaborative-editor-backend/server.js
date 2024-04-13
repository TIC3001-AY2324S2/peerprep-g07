const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors');
const server = http.createServer(app)
const { Server } = require('socket.io')
const { v4 } = require('uuid')
const bodyParser = require('body-parser');

const connectDB = require('./config/db')
connectDB()

const allowedOrigins = ['http://127.0.0.1:8000', 'http://localhost:8000'];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json())

const { blueBright, greenBright, redBright, yellowBright } = require('chalk')

const room = { // for 1 room currently
  id: v4(),
  users: [],
  code: ''
};

app.use('/api/collab',require('./routes/collabRoutes'))

app.get('/', (req, res) => {
  console.log(blueBright('test connection with /get'))
  res.send({ msg: 'hi' })
})

// Socket event handlers
io.on('connection', (socket) => {
  console.log(redBright('connected established', socket))
  socket.on('CONNECTED_TO_ROOM', ({ roomID }) => {
    console.log(redBright.bold('CONNECTED', roomID))
    socket.join(room.id);
    room.users.push({ socketId: socket.id }); // Add socketId to the user object
    io.in(room.id).emit('ROOM:CONNECTION', room.users);
    socket.emit('CODE_UPDATED', room.code); // Send current code content to the newly connected user
  });

  socket.on('CODE_CHANGED', (newCode) => {
    console.log(yellowBright.bold('code changes'))
    room.code = newCode; // Update the code content in the room
    io.in(room.id).emit('CODE_UPDATED', newCode); // Broadcast the updated code to all users in the room
  });

  socket.on('disconnect', () => {
    const index = room.users.findIndex((user) => user.socketId === socket.id);
    console.log(redBright('disconnected', room.users[index]));
    if (index !== -1) {
      room.users.splice(index, 1);
      io.in(room.id).emit('ROOM:CONNECTION', room.users);
    }
    if (room.users.length === 0) {
      console.log(redBright.bold('All users disconnected, closing room'));
      // Clean up the room object
      room.id = null;
      room.code = '';
    }
  });
});

server.listen(4001, () => {
  console.log(greenBright.bold('listening on *:4001'))
})

module.exports = app