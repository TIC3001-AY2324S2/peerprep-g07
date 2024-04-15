'use strict';
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors');
const server = http.createServer(app)
const { Server } = require('socket.io')
const bodyParser = require('body-parser');
const Eureka = require('eureka-js-client').Eureka;

const connectDB = require('./config/db')
connectDB()

const PORT = process.env.PORT || 4001

const client = new Eureka({
  instance: {
    app: process.env.SERVICE || 'collaboration-service',
    hostName: 'localhost',
    ipAddr: process.env.LOCAL_IPADDR || '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/',
    vipAddress: process.env.SERVICE || 'collaboration-service',
    port: {
      '$': PORT,
      '@enabled': 'true',
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
  },
  //retry 10 time for 3 minute 20 seconds.
  eureka: {
    host: process.env.EUREKA_HOST || 'localhost',
    port: process.env.EUREKA_PORT || 8761,
    servicePath: process.env.EUREKA_SERVICE_PATH || '/eureka/apps/',
  },
})

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

app.use('/api/collab',require('./routes/collabRoutes'));

client.start(error=>{
  console.log(error || "collaboration-service registered!!")
  app.get('/', (req, res) => {
    res.send({ msg: 'Hello world from collaboration service!' })
  })  
})

// Socket event handlers
io.on('connection', (socket) => {
  console.log(redBright('connected established', socket))
  socket.on('CONNECTED_TO_ROOM', ( roomID ) => {
    console.log("ALL ROOMS CURRENTLY: ", rooms)
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
  socket.on('DISCONNECT', ( roomID ) => {
    const currRoom = rooms.find(room => room.id === roomID);
    const index = currRoom.users.findIndex((user) => user.socketId === socket.id);
    const roomIndex = rooms.findIndex(room => room.id === roomID);
    console.log("room index: ", roomIndex)
    if (index !== -1) {
      currRoom.users.splice(index, 1);
      // io.in(room.id).emit('ROOM:CONNECTION', room.users);
      console.log(redBright.bold('Removing, closing room'));
    }
    if (currRoom.users.length === 0) {
      // Clean up the room object
      console.log(redBright.bold('All users disconnected, removing old room', rooms[roomIndex], 'remaining rooms:', rooms.length));
      rooms.splice(roomIndex, 1)
    }
  });
});

server.listen(PORT, () => {
  console.log(greenBright.bold('listening on *:4001'))
})

module.exports = app