import React from "react";
import { useSelector } from "react-redux";
import jsonFormat from "../../utils/jsonFormat";

export default function Stats() {
  const stats = jsonFormat(useSelector((state) => state.stats));
  return <>{stats && <pre>{stats}</pre>}</>;
}
