// import dependencies required for mongoose
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/collaboration-service"

// function to start up and connect to MongoDB database
const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGODB_URI) // read from the .env file
    console.log(`MongoDB Connected: ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// export connection function to be used in index.js
module.exports = connectDB