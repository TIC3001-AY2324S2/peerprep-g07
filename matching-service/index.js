const express = require('express');
const app = express();

// Import the cors middleware to enable CORS on the server
const cors = require("cors");

// allow URL-encoded data in request body to be parsed
app.use(express.urlencoded({ extended: false }))
// allow JSON data in request body to be parsed
app.use(express.json())

app.use(cors());
app.options(
  '*',
  cors({
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000'],
    optionsSuccessStatus: 200,
  }), 
)
app.use(cors())

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

// use the router to handle requests 
// at http://localhost:3002/api/match
app.use('/match', require('./routes/matchingRoutes'))

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

// use 3002 as a fallback if PORT is undefined in .env file
const PORT = process.env.PORT || 3002

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// export Express.js application to be used elsewhere
module.exports = app
