import path from "path";
import chokidar from "chokidar";
import socketIOClient from "socket.io-client";

const filePath = path.resolve(__dirname, "../src/logs.log");

const ENDPOINT = "http://localhost:3004";
const socket = socketIOClient(ENDPOINT);

const fileEventHandler = (event, path  ) => {
  
  if (event === "change") {
    console.log("new file", event);
    socket.emit("file change", event);
  }
};

chokidar.watch(filePath).on("all", fileEventHandler);
