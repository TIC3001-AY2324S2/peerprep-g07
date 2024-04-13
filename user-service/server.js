import http from "http";
import index from "./index.js";
import "dotenv/config";

const port = process.env.PORT || 8001;

const server = http.createServer(index);

console.log("Starting on Port:", port);

server.listen(port);
