import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import config from "../../config";
const ENDPOINT = `${config.baseUrl}/api/logs`;

export default function LoggerBar() {
  const postData = async (url, data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "*cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  };

  const clickHandler = (e) => {
    const status = e.currentTarget.attributes["data-status"].value;
    const d = new Date();
    const body = {
      date: d.toISOString(),
      status,
      message: `${status.toLowerCase()} a b c d ....`,
    };

    postData(ENDPOINT, body);
  };

  return (
    <ButtonGroup
      size="large"
      color="primary"
      aria-label="large outlined primary button group"
    >
      <Button data-status="INFO" endIcon={<InfoIcon />} onClick={clickHandler}>
        Info
      </Button>
      <Button
        data-status="WARNING"
        color="secondary"
        endIcon={<WarningIcon />}
        onClick={clickHandler}
      >
        Warning
      </Button>
      <Button
        data-status="ERROR"
        color="error"
        endIcon={<ErrorIcon />}
        onClick={clickHandler}
      >
        Error
      </Button>
    </ButtonGroup>
  );
}
