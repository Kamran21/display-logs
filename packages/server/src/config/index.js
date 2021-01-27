import path from "path";

export default {
  port: 3004,
  filePath: path.resolve(__dirname, "../../../file_listener/src/logs.log"), //dirname(require.main.filename),
};
