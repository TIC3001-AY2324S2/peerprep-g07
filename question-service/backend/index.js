'use strict';
const dotenv = require('dotenv').config()
const Eureka = require('eureka-js-client').Eureka;

// use 8080 as a fallback if PORT is undefined in .env file
const PORT = process.env.PORT || 8080

const connectDB = require('./config/db')
connectDB()

const express = require('express')
const app = express();
const cors = require('cors')

const client = new Eureka({
  instance: {
    app: process.env.SERVICE || 'question-service',
    hostName: 'localhost',
    ipAddr: process.env.LOCAL_IPADDR || '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/',
    vipAddress: process.env.SERVICE || 'question-service',
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

app.options(
  '*',
  cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    optionsSuccessStatus: 200,
  }), 
)
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// use the address router to handle requests 
// at http://localhost:8080/api/questions
client.start(error=>{
  console.log(error || "question-service registered!!")
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
  })
})
app.use('/api/questions', require('./routes/questionRoutes'))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})

// when a GET request is made to http://localhost:8080/, 
// the response will be { message: 'Hello World' } in JSON format
// app.get('/', (req, res) => {
//   res.json({ message: 'Hello World' })
// })

// export Express.js application to be used elsewhere
module.exports = app