import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

const getKey = (line) =>
  (line.includes("INFO") && "INFO") ||
  (line.includes("WARNING") && "WARNING") ||
  (line.includes("ERROR") && "ERROR");

const lineToObjectByStatus = (key, row) => {
  const rowArr = row.split(key); //this will output ["1234", "56789"]
  return { date: rowArr[0], status: key, description: rowArr[1] };
};

function createData(row) {
  const key = getKey(row);
  switch (key) {
    case "INFO":
      return lineToObjectByStatus("INFO", row);
    case "WARNING":
      return lineToObjectByStatus("WARNING", row);
    case "ERROR":
      return lineToObjectByStatus("ERROR", row);
    default:
      return { date: "", status: "", description: "" };
  }
}

export default function LogRow({ logRow, columns }) {
  const row = createData(logRow);
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === "number"
              ? column.format(value)
              : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
