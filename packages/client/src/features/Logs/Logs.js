import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";

import LoggerBar from "./LoggerBar";
import StickyHeadTable from "./StickyHeadTable";
import Stats from "../Stats/Stats";
import { loadLogs, addLog } from "./logs.slice";
import { setStats } from "../Stats/stats.slice";
import config from "../../config";

const ENDPOINT = config.baseUrl;

const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket"],
  query: `uuid=${uuidv4()}`,
});

function Logs() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("load file", (data) => {
      const { lines, stats } = data;
      console.log("lines: ", lines);
      dispatch(loadLogs(lines));
      dispatch(setStats(stats));
    });

    socket.on("file change", (data) => {
      const { newLine, updatedStats } = data;
      console.log(newLine, updatedStats);
      dispatch(addLog(newLine));
      dispatch(setStats(updatedStats));
    });
  }, [dispatch]);

  return (
    <>
      <h1>Fake new logs:</h1>
      <LoggerBar />
      <h1>Logs:</h1>
      <Stats />
      <StickyHeadTable />
    </>
  );
}
export default Logs;
