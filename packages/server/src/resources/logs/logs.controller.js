import { appendFileSync } from "fs";
import config from "../../config";
import fileManager from "../../utils/fileManager";

const { filePath } = config;
const getAll = (req, res) => {};

const createOne = (req, res) => {
  // console.log(req.body);
  // console.log("filePath", filePath);
  try {
    const line = Object.values(req.body)
      .join(" ")
      .concat("\r\n");

    console.log(line);

    appendFileSync(filePath, line);
    fileManager.addLine(line);
    res.status(200).json({ data: "new line added to the log" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export { getAll, createOne };
