import { useState } from "react";
import Header from "./header/header";
import Body from "./body/body";
import { formatDate } from "./utils/utils";
import Login from "./loginPage/login";

function App() {
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const addLogMessage = (message: string) => {
    const messageTimestampt = `${formatDate()} ${message}`;
    setLogMessages((prevMessage) => [...prevMessage, messageTimestampt]);
  };

  return (
    <>
      <Login />
      {/* <Header addLogMessage={addLogMessage} />
      <Body logMessages={logMessages} addLogMessage={addLogMessage} /> */}
    </>
  );
}

export default App;
