import React, { useState } from "react";
import { Container, ButtonGroup, Button } from "@material-ui/core";
import Logs from "./features/Logs/Logs";
import RecursiveValues from "./features/Test/RecursiveValues";

function App() {
  const [route, setRoute] = useState("Logs");

  const clickHandler = (e) => {
    const route = e.currentTarget.attributes["data-route"].value;
    setRoute(route);
  };

  const getContent = () => {
    switch (route) {
      case "Test":
        return <RecursiveValues />;
      default:
        return <Logs />;
    }
  };

  const content = getContent();

  return (
    <>
      <Container maxWidth="sm">
        <div>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
          >
            <Button
              color={route === "Logs" ? "secondary" : "primary"}
              data-route="Logs"
              onClick={clickHandler}
            >
              Logs
            </Button>
            <Button
              color={route === "Test" ? "secondary" : "primary"}
              data-route="Test"
              onClick={clickHandler}
            >
              Test
            </Button>
          </ButtonGroup>

          {content}
        </div>
      </Container>
    </>
  );
}
export default App;
