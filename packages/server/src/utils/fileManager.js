// simple in memory file manager
import lineByLine from "n-readlines";
import fs from "fs";

// state representing a file
let state = {
  lines: [],
  length: -1,
  stats: {
    info: 0,
    warning: 0,
    error: 0,
  },
};

const getKey = (line) =>
  (line.includes("INFO") && "info") ||
  (line.includes("WARNING") && "warning") ||
  (line.includes("ERROR") && "error");

const updateStats = (line) => {
  const key = getKey(line);

  state.stats[key]++;
};

const addLine = (line, lineNumber) => {
  state.lines.push(line.replace(/(\r\n|\n|\r)/gm, ""));
  state.length = lineNumber || state.length + 1;
  updateStats(line);
};

const loadAsync = (file) => {
  const liner = new lineByLine(file);

  let line;
  let lineNumber = 0;

  while ((line = liner.next())) {
    const asciLine = line.toString("ascii");
    console.log(`Line ${++lineNumber}: ${asciLine}`);
    addLine(asciLine, lineNumber);
  }

  console.log("end of line reached");
  return state.length > -1;
};

const loadSync = (file) => {
  state.lines = fs.readFileSync(file, "utf-8").split(/\r?\n/);
  return Array.isArray(state.lines);
};

const last = () =>
  state.lines && state.lines.length > 0 && state.lines[state.lines.length - 1];

const getState = () => {
  return state;
};

export default { getState, loadAsync, loadSync, last, addLine };
