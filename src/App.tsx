import { useState } from "react";
import Header from "./header/header";
import Body from "./body/body";
import { formatDate } from "./utils/utils";
import Login from "./loginPage/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const addLogMessage = (message: string) => {
    const messageTimestampt = `${formatDate()} ${message}`;
    setLogMessages((prevMessage) => [...prevMessage, messageTimestampt]);
  };

  console.log(isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Header addLogMessage={addLogMessage} />
                <Body logMessages={logMessages} addLogMessage={addLogMessage} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
