import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import socketio from "socket.io";

import config from "./config";
import logsRouter from "./resources/logs";
import clientsManager from "./utils/clientsManager";
import fileManager from "./utils/fileManager";

export const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/logs", logsRouter);

export const start = async ({ port, filePath }) => {
  try {
    console.log("Attempt loading the file..");
    const fileProcessed = await fileManager.loadAsync(filePath); // Prepare file data before listening
    console.log("Lines: ", fileManager.getState());
    if (fileProcessed) {
      console.log("File loaded successfully!!!");

      server.listen(port, () => {
        console.log(`REST API on http://localhost:${port}/api`);
      });

      //listening to sockets
      io.on("connection", (socket) => {
        // Runs on new client connection
        const { uuid } = socket.handshake.query;
        clientsManager.addNewClient(uuid);
        clientsManager.loadClientWithLogFile(socket, fileManager.getState());

        if (uuid) {
          console.log(`Client ${uuid} connected`);
        }

        console.log("Clients state: ", clientsManager.getState());

        // Broadcast "file change" after fileListener receives a change event and emits "file change"
        socket.on("file change", (msg) => {
          console.log("message: " + msg);
          const newLine = fileManager.last();
          const fileState = fileManager.getState();
          const updatedStats = fileState.stats;
          console.log("fileState: ", fileState);
          console.log(`newLine ${newLine}`);
          io.emit("file change", { newLine, updatedStats }); //Broadcasting file change to clients
        });

        // Runs when one of the clients disconnects
        socket.on("disconnect", (socket) => {
          console.log("client disconnected", socket);
        });
      });
    }
  } catch (e) {
    console.log("Start error..", e);
  }
};

start(config);

///////////////////////////////////////////////////////////
// I didn't fined a way to emit to the socket internally
// therefore moved this logic to fileListener app
//
// const fileEventHandler = (event, path) => {
//   console.log("filePath", filePath);
//   console.log(event, path);
//   if (event === "change") {
//     console.log("new file", event);
//     io.sockets.emit("file change", event);
//   }
// };

// chokidar.watch(filePath).on("all", fileEventHandler);
