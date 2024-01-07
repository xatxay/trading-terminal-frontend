import React, { useState } from "react";
import Header from "./header/header";
import Body from "./body/body";
import { formatDate, useAutoLogout } from "./utils/utils";
import Login from "./loginPage/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./loginPage/createAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BybitApiProvider } from "./apiContext/apiContext";
import { Global } from "@emotion/react";
import globalScrollbarStyle from "./scrollbar/scrollbar";

function App() {
  const [logMessages, setLogMessages] = useState<string[]>([]);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  //   !!localStorage.getItem("token")
  // );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const addLogMessage = (message: string) => {
    const messageTimestampt = `${formatDate()} ${message}`;
    setLogMessages((prevMessage) => [...prevMessage, messageTimestampt]);
  };

  console.log(isAuthenticated);

  return (
    <>
      <Global styles={globalScrollbarStyle} />
      <BybitApiProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover
            closeOnClick
            closeButton
            theme="dark"
          />
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <MainPage
                    addLogMessage={addLogMessage}
                    logMessage={logMessages}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </BybitApiProvider>
    </>
  );
}

const MainPage: React.FC<{
  addLogMessage: (message: string) => void;
  logMessage: string[];
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}> = ({ addLogMessage, logMessage, setIsAuthenticated }) => {
  const navigate = useNavigate();
  useAutoLogout(setIsAuthenticated, navigate);
  return (
    <>
      <Header
        addLogMessage={addLogMessage}
        setIsAuthenticated={setIsAuthenticated}
        navigate={navigate}
      />
      <Body logMessages={logMessage} addLogMessage={addLogMessage} />
    </>
  );
};

export default App;
