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
  id: '',
  users: [],
  code: ''
};

// rooms to manage separation of every room
const rooms = [];

app.use('/api/collab',require('./routes/collabRoutes'))

app.get('/', (req, res) => {
  console.log(blueBright('test connection with /get'))
  res.send({ msg: 'hi' })
})

// Socket event handlers
io.on('connection', (socket) => {
  console.log(redBright('connected established', socket))
  socket.on('CONNECTED_TO_ROOM', ( roomID ) => {
    console.log(redBright("connected_to_room: ", roomID))

    // roomid here is unique and given by the frontend from mongodb
    // check if user already has a room 
    const currRoom = rooms.find(room => room.id === roomID);

    if (currRoom){
      if (!currRoom.users.some(user => user.socketId === socket.id)){
        socket.join(roomID);
        currRoom.users.push({ socketId: socket.id })
      }
      socket.emit('CODE_UPDATED', currRoom.code);
    }
    else{
      room.id = roomID
      room.users.push({ socketId: socket.id })
      room.code = ''
      rooms.push(room)
      socket.emit('CODE_UPDATED', room.code);
      socket.join(roomID);
    }
  
    // io.in(room.id).emit('ROOM:CONNECTION', room.users);

    // socket.emit('CODE_UPDATED', currRoom.code); // Send current code content to the newly connected user
  });

  socket.on('CODE_CHANGED', (data) => {
    const { roomID, newCode } = data;
    const currRoom = rooms.find(room => room.id === roomID.room);
    // only when there's a room
    if (currRoom){
      console.log(yellowBright.bold("there is a room and these are changes being made: ", newCode))
      currRoom.code = newCode; // Update the code content in the room
      io.in(currRoom.id).emit('CODE_UPDATED', newCode); // Broadcast the updated code
    }    
  });


  // handle the disconnect later
  // socket.on('disconnect', () => {
  //   const index = room.users.findIndex((user) => user.socketId === socket.id);
  //   console.log(redBright('disconnected', room.users[index]));
  //   if (index !== -1) {
  //     room.users.splice(index, 1);
  //     io.in(room.id).emit('ROOM:CONNECTION', room.users);
  //   }
  //   if (room.users.length === 0) {
  //     console.log(redBright.bold('All users disconnected, closing room'));
  //     // Clean up the room object
  //     room.id = null;
  //     room.code = '';
  //   }
  // });
});

server.listen(4001, () => {
  console.log(greenBright.bold('listening on *:4001'))
})

module.exports = app