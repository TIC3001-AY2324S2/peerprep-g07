const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { v4 } = require('uuid')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const { blueBright, greenBright, redBright, yellowBright } = require('chalk')

const room = { // for 1 room currently
  id: v4(),
  users: [],
  code: ''
};

app.get('/', (req, res) => {
  console.log(blueBright('test connection with /get'))
  res.send({ msg: 'hi' })
})

// Route to create a room and join as a user
app.post('/create-room-with-user', async (req, res) => {
  console.log(blueBright.bold('entered room with user'))
  const roomId = v4();
  res.status(201).send({ roomId });
});

// Socket event handlers
io.on('connection', (socket) => {
  console.log(redBright('connected established', socket))
  socket.on('CONNECTED_TO_ROOM', ({ username }) => {
    console.log(redBright.bold('CONNECTED', username))
    socket.join(room.id);
    room.users.push({ username, socketId: socket.id }); // Add socketId to the user object
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