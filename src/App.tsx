import { useState } from "react";
import Header from "./header/header";
import Body from "./body/body";

function App() {
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const addLogMessage = (message: string) => {
    setLogMessages((prevMessage) => [...prevMessage, message]);
  };

  return (
    <>
      <Header addLogMessage={addLogMessage} />
      <Body logMessages={logMessages} addLogMessage={addLogMessage} />
    </>
  );
}

export default App;
