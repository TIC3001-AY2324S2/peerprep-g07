'use strict';
require('dotenv').config()
const Eureka = require('eureka-js-client').Eureka;
const express = require('express');
const app = express();

// use 3002 as a fallback if PORT is undefined in .env file
const PORT = process.env.PORT || 3002

// Import the cors middleware to enable CORS on the server
const cors = require("cors");

const client = new Eureka({
  instance: {
    app: process.env.SERVICE || 'matching-service',
    hostName: 'localhost',
    ipAddr: process.env.LOCAL_IPADDR || '127.0.0.1',
    statusPageUrl: 'http://localhost:3002/',
    vipAddress: process.env.SERVICE || 'matching-service',
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

// app.options(
//   '*',
//   cors({
//     origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   }), 
// )
// app.use(cors())

// app.use(cors()); // config cors so that front-end can use
// app.options("*", cors());

// To handle CORS Errors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // "*" -> Allow all links to access

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   // Browsers usually send this before PUT or POST Requests
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
//     return res.status(200).json({});
//   }

//   // Continue Route Processing
//   next();
// });

// allow URL-encoded data in request body to be parsed
app.use(express.urlencoded({ extended: false }))
// allow JSON data in request body to be parsed
app.use(express.json())

// To handle CORS Errors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // "*" -> Allow all links to access

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   // Browsers usually send this before PUT or POST Requests
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
//     return res.status(200).json({});
//   }

//   // Continue Route Processing
//   next();
// });

client.start(error=>{
  console.log(error || "matching-service registered!!")
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World from matching-service!' })
  })
})

// use the router to handle requests 
// at http://localhost:3002/match
app.use('/match', require('./routes/matchingRoutes'))

// Handle When No Route Match Is Found
// app.use((req, res, next) => {
//   const error = new Error("Route Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// export Express.js application to be used elsewhere
module.exports = app
