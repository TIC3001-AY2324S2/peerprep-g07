import express from "express";
import cors from "cors";

import userRoutes from "./routes/user-service-routes.js";
import authRoutes from "./routes/auth-routes.js";

// lifted from https://dev.to/caspergeek/how-to-use-require-in-ecmascript-modules-1l42
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Eureka = require('eureka-js-client').Eureka;

const app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// To handle CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" -> Allow all links to access

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Browsers usually send this before PUT or POST Requests
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }

  // Continue Route Processing
  next();
});

const client = new Eureka({
  instance: {
    app: process.env.SERVICE || 'user-service',
    hostName: 'localhost',
    ipAddr: process.env.LOCAL_IPADDR || '127.0.0.1',
    statusPageUrl: 'http://localhost:8080/',
    vipAddress: process.env.SERVICE || 'user-service',
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

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  console.log("Sending Greetings!");
  res.json({
    message: "Hello World from user-service",
  });
});

client.start(error=>{
  console.log(error || "user-service registered!!")
  app.get("/", (req, res, next) => {
    console.log("Sending Greetings!");
    res.json({
      message: "Hello World from user-service",
    });
  });
})

// Handle When No Route Match Is Found
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
